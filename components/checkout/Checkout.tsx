"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { payStackHandler, verifyPayment } from "@/lib/actions";
import { useSelector, useDispatch } from "react-redux";

import { useUpdateUserMutation } from "@/redux/slices/usersApiSlice";
import { useAddNewOrderMutation } from "@/redux/slices/orderApiSlice";
import { clearCart } from "@/redux/slices/cartSlice";
import { getUserData, getUsersession, sendEmail } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormSkeletonCard } from "@/components/skeleton/FormSkeleton";
import CheckoutEditForm from "@/components/checkout/CheckoutEditForm";
import CheckoutForm from "@/components/checkout/CheckOutForm";
import CheckoutCart from "@/components/checkout/CheckoutCart";
import OrderSummary from "@/components/checkout/OrderSummary";
import ModalThankyou from "@/components/Thankyou/ModalThankyou";
import LoaderSimple from "@/components/Loader/Loader-simple/page";
import { AlertDestructive } from "@/components/ErrorAlert";

export default function Checkout() {
  const [updateUser] = useUpdateUserMutation();
  const [addNewOrder] = useAddNewOrderMutation();

  // Redux state
  const dispatch = useDispatch();
  const cartItem = useSelector((state: any) => state.cart.items);

  const searchParams = useSearchParams();

  const [user, setUser] = useState<User>();
  const [address, setAddress] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalOrder, setModalOrder] = useState(false);
  const [modalThankyou, setModalThankyou] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [edit, setEdit] = useState(false);

  const [selectedOption, setSelectedOption] = useState("Pay before delivery");
  const [showSpinner, setShowSpinner] = useState(false);

  const router = useRouter();

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const toggleSpinner = () => setShowSpinner((prev) => !prev);

  const subTotal = cartItem.reduce(
    (acc: number, item: CartItem) =>
      acc + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  // Fetch user session and data
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        setIsLoading(true);
        const session = await getUsersession();
        const userData = await getUserData(session.preferred_email);
        setUser(userData);
        setAddress(userData?.address || {});
        setPhoneNumber(userData?.phone_number || "");
      } catch (error) {
        setErrorMsg("Failed to fetch user session");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSession();
  }, []);

  useEffect(() => {
    const handleCallback = async () => {
      const reference = searchParams.get("reference");

      if (reference && user?.email) {
        setShowSpinner(true);
        try {
          const result = await verifyPayment(user.email, reference);

          if (result?.data?.status === "success") {
            // Step 2: Place the order ONLY after payment is verified
            const orderDetails = {
              email: user.email,
              subtotal: subTotal,
              cartItem,
            };
            const orderResult: any = await addNewOrder(orderDetails).unwrap();

            // Step 3: Send Email Notification
            await sendEmail(
              "tillynclothings@gmail.com",
              `New Order Placed: ${orderResult._id}`,
              generateEmailBody(user, cartItem, subTotal + 50, orderResult._id)
            );

            dispatch(clearCart());
            toggleModalThankyou(); // Show Thank You modal
          } else {
            setErrorMsg("Payment verification failed. Order not placed.");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          setErrorMsg("Payment verification error. Please contact support.");
        } finally {
          setShowSpinner(false);
          router.push("/"); // Redirect home
        }
      }
    };

    if (searchParams.get("reference") && user?.email) {
      handleCallback();
    }
  }, [searchParams, user?.email]);

  const placeOrderAndHandlePayment = useCallback(async () => {
    if (!user?.email || !user?.phone_number || !user?.address) {
      setErrorMsg("Please enter your phone, address and your city");
      return;
    }

    setShowSpinner(true);

    try {
      if (selectedOption === "Pay after delivery") {
        toggleModalOrder();
        return;
      }

      // Step 1: Initiate Payment & Get Transaction Reference
      const res = await payStackHandler(user.email, subTotal + 50);
      if (!res?.data?.data?.authorization_url) {
        setErrorMsg("Payment initiation failed. Please try again.");
        setShowSpinner(false);
        return;
      }

      router.push(res.data.data.authorization_url); // Redirect user to Paystack

      // Return reference ID for verification after redirection
      return res.data.data.reference;
    } catch (error) {
      console.error("Error initiating payment:", error);
      setErrorMsg("Payment initiation failed. Please try again.");
      setShowSpinner(false);
    }
  }, [user, subTotal, selectedOption]);

  const placeOrder = useCallback(async () => {
    if (!user?.email || !user?.phone_number || !user?.address) {
      setErrorMsg("Please enter your phone, address and your city");
      return;
    }
    if (selectedOption === "Pay after delivery") toggleModalOrder();
    toggleSpinner();

    try {
      const orderDetails = {
        email: user.email,
        subtotal: subTotal,
        cartItem,
      };
      const orderResult: any = await addNewOrder(orderDetails).unwrap();

      // Send email notification
      await sendEmail(
        "tillynclothings@gmail.com",
        `New Order Placed: ${orderResult.order._id}`,
        generateEmailBody(orderResult.user, cartItem, subTotal, orderResult._id)
      );

      dispatch(clearCart());
      toggleModalThankyou();
    } catch (error) {
      console.error("Error placing order:", error);
      setErrorMsg("Failed to place the order. Please try again.");
    } finally {
      toggleSpinner();
    }
  }, [user, subTotal, cartItem, addNewOrder, dispatch, selectedOption]);

  // Generate email body
  const generateEmailBody = (
    user: User,
    cartItems: CartItem[],
    subtotal: number,
    orderId: string
  ) => `
    <p>We have received a new order. Here are the details:</p>
    <h3>Client Info:</h3>
    <ul>
      <li>Name: ${user.first_name} ${user.last_name}</li>
      <li>Email: ${user.email}</li>
      <li>Phone: ${user.phone_number}</li>
    </ul>
    <h3>Order Details:</h3>
    <ul>
      ${cartItems
        .map(
          (item) => `
          <li>
          <img src="${item.image_url}" alt="${
            item.name
          }" style="width:100px; height:100px;" onerror="this.style.display='none';"/>
            Product: ${item.name}<br>
            Quantity: ${item.quantity}<br>
            Size: ${item.selectedSize}<br>
            Total Price: ${item.price * item.quantity}
          </li>`
        )
        .join("")}
    </ul>
    <h3>Subtotal: ${subtotal} excluding delivery</h3>
    <p>Order ID: ${orderId}</p>
      <h3>Address Information:</h3>
        <ul>
          <li>Client Address: ${user?.address?.address_line1}, ${
    user?.address?.city
  }, ${user?.address?.postal_code}</li>

        </ul>
        <p>Please ensure that the order is processed promptly and the client is notified of the shipping status. If there are any issues or further actions required, kindly coordinate with the relevant departments.</p>
        <p>Thank you for your attention to this order.</p>
        <p>Best regards,</p>
        <p>Tillyn Clothing</p>
  `;
  // Modal toggles
  const toggleModalOrder = () => setModalOrder((prev) => !prev);
  const toggleModalThankyou = () => setModalThankyou((prev) => !prev);

  // toggle edit
  const toggleEdit = () => setEdit((prev) => !prev);

  // Handle address changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.email) {
      setErrorMsg("User email is missing");
      return;
    }

    const updateObj = {
      preferred_email: user.email,
      address,
      phone_number: phoneNumber,
    };

    try {
      const updatedUser: any = await updateUser(updateObj).unwrap();
      setUser(updatedUser.user);
      setAddress(updatedUser.user.address);
      setPhoneNumber(updatedUser.user.phone_number);
      setErrorMsg("");
    } catch (error) {
      console.error("Failed to update user:", error);
      setErrorMsg("Failed to update your information. Please try again.");
    }
    toggleEdit();
  };

  return (
    <>
      {modalOrder && (
        <OrderConfirmationModal
          toggleModalOrder={toggleModalOrder}
          placeOrder={placeOrder}
        />
      )}

      {showSpinner && <LoaderSimple />}

      <ModalThankyou
        modalThankyou={modalThankyou}
        toggleModalThankyou={toggleModalThankyou}
      />

      <div className="flex md:justify-center md:items-center">
        <div className="flex flex-col-reverse md:flex-row px-5 w-full md:max-w-7xl gap-10">
          {edit ? (
            <CheckoutEditForm
              user={user}
              setPhoneNumber={setPhoneNumber}
              phone_number={phoneNumber}
              address={address}
              toggleEdit={toggleEdit}
              handleAddressChange={handleAddressChange}
              handleSaveSubmit={handleSaveSubmit}
            />
          ) : (
            <div className="flex flex-col gap-5 w-full md:w-1/2 p-5">
              <div className=" flex justify-between">
                <h1 className="text-2xl font-bold">Confirm details</h1>
              </div>

              {isLoading ? (
                <FormSkeletonCard />
              ) : errorMsg ? (
                <AlertDestructive errorMessage={errorMsg} />
              ) : (
                <CheckoutForm
                  user={user}
                  toggleModalOrder={toggleModalOrder}
                  selectedOption={selectedOption}
                  placeOrderAndHandlePayment={placeOrderAndHandlePayment}
                  toggleSpinner={toggleSpinner}
                  handleOptionChange={handleOptionChange}
                  setSelectedOption={setSelectedOption}
                />
              )}
            </div>
          )}
          <div className="w-full border-l p-5">
            {cartItem.map((item: CartItem, index: number) => {
              return <CheckoutCart key={index} item={item} />;
            })}
            <OrderSummary subTotal={subTotal} />
          </div>
        </div>
      </div>
    </>
  );
}

// Order confirmation modal
const OrderConfirmationModal = ({
  toggleModalOrder,
  placeOrder,
}: {
  toggleModalOrder: () => void;
  placeOrder: () => void;
}) => (
  <Card>
    <div className="flex flex-col justify-between fixed top-1/2 left-1/2 p-10 transform -translate-x-1/2 -translate-y-1/2 z-10 h-52 blur-nav rounded-xl">
      <h1 className="text-xl text-black">Ready to make it yours?</h1>
      <div className="flex gap-3">
        <Button variant="outline" onClick={toggleModalOrder}>
          Cancel
        </Button>
        <Button onClick={placeOrder}>Confirm</Button>
      </div>
    </div>
    <div className="overlay" onClick={toggleModalOrder}></div>
  </Card>
);
