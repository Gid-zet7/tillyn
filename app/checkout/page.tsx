"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Loader from "@/components/Loader/page";
// import Snackbar from "@/components/Snackbar/Snackbar";
import Image from "next/image";
import { getUserData, getUsersession, sendEmail } from "@/lib/actions";
import { useUpdateUserMutation } from "@/redux/slices/usersApiSlice";
import { useAddNewOrderMutation } from "@/redux/slices/orderApiSlice";
// import Paper from "@mui/material/Paper";
// import PulseLoader from "@/components/Loader/Loader-two/page";
// import LoaderSimple from "@/components/Loader/Loader-simple/page";
// import ModalThankyou from "../Thankyou/ModalThankyou";

import { useSelector, useDispatch } from "react-redux";

export default function Checkout() {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [addNewOrder] = useAddNewOrderMutation();

  const cartItem = useSelector((state) => state.cart.items);
  console.log(cartItem);
  const [modalOrder, setModalOrder] = useState(false);
  const [modalThankyou, setModalThankyou] = useState(false);
  // const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [user, setUser] = useState();
  console.log(user);

  const [phone_number, setPhoneNumber] = useState(user?.phone_number || "");
  const [address, setAddress] = useState(
    user?.address || {
      address_line1: "",
      address_line2: "",
      city: "",
      postal_code: "",
    }
  );
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [loaderMsg, setLoaderMsg] = useState("");
  const [result, setResult] = useState();
  const [edit, setEdit] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const router = useRouter();

  const subTotal = cartItem.reduce((acc: number, item: CartItem) => {
    return acc + (item?.price || 0) * (item?.quantity || 0);
  }, 0);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const userSession = await getUsersession();
        console.log(userSession);
        const userData = await getUserData(userSession.preferred_email);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  // useEffect(() => {
  //   if (error) {
  //     setShowErrorSnackbar(true);
  //     const timer = setTimeout(() => {
  //       setShowErrorSnackbar(false);
  //       setError("");
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [error]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setShowSuccessSnackbar(true);
  //     const timer = setTimeout(() => {
  //       setShowSuccessSnackbar(false);
  //       setIsSuccess("");
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [isSuccess]);

  const placeOrder = async (
    email: string,
    subtotal: number,
    cartItem: CartItem[]
  ) => {
    // setIsLoading(true);
    // setLoaderMsg("Placing order");

    try {
      const orderDetails = {
        email,
        subtotal,
        cartItem,
      };
      const result = await addNewOrder(orderDetails);
      console.log("result:", result);

      if (result) {
        try {
          await sendEmail(
            `tillynclothings@gmail.com`,
            `New Order Placed: ${result._id}`,
            `
        <p>We have received a new order from a client. Please find the details of the order below:</p>
        <h3>Client Information:</h3>
        <ul>
          <li>Client Name: ${user?.first_name} ${user?.last_name}</li>
          <li>Email Address: ${user?.email}</li>
          <li>Phone Number: ${user?.phone_number}</li>
        </ul>
        <h3>Order Details:</h3>
        <ul>
          <li>Order ID: ${result._id}</li>
          ${cart
            .map(
              (item) => `
              <li>
                <img src="${item.image_url}" alt="${
                item.name
              }" style="width:100px; height:100px;" onerror="this.style.display='none';"/>
                Product: ${item.name} <br>
                Price: ${item.price} <br>
                Quantity: ${item.quantity} <br>
                Total Price: ${item.price * item.quantity}
                Brand: ${item.brand}
              </li>
              <br>
            `
            )
            .join("")}
        </ul>
        <h2>Sub Total: ${subtotal}</h2>
        <h3>Address Information:</h3>
        <ul>
          <li>Client Address: ${user?.address.address_line1}, ${
              user?.address.city
            }, ${user?.address.postal_code}</li>

        </ul>
        <p>Please ensure that the order is processed promptly and the client is notified of the shipping status. If there are any issues or further actions required, kindly coordinate with the relevant departments.</p>
        <p>Thank you for your attention to this order.</p>
        <p>Best regards,</p>
        <p>Tillyn<br>Your Contact Information</p>
      `
          );
        } catch (emailError) {
          console.error("Error sending email:", emailError);
        }

        // setIsSuccess("Order placed successfully");
        toggleModalOrder();
        toggleModalThankyou();
        // const updatedCartItems = await getCartItem(userId);
        // setCartItem(updatedCartItems);
      } else {
        throw new Error("Order result is undefined or empty");
      }
    } catch (error) {
      console.error("Error in placeOrder function:", error);
      // setError("Error placing order.");
    } finally {
      // setIsLoading(false);
    }
  };

  const toggleModalOrder = () => {
    setModalOrder((prevState) => !prevState);
  };

  const toggleModalThankyou = () => {
    setModalThankyou((prevState) => !prevState);
  };

  const toggleEdit = () => {
    setEdit((prevState) => !prevState);
  };

  const handleAddressChange = (e: any) => {
    const { name, value } = e.target;
    setAddress((prevData) => ({
      ...(prevData || {}),
      [name]: value,
    }));
  };

  const handleSaveSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoadRegister(true);
    const updateObj = {
      preferred_email: email,
      phone_number,
      address,
    };

    try {
      const response = await updateUser(updateObj);

      // setError("");
      // setIsSuccess("updated successfully!");
      if (!user?._id) {
        console.error("User ID is not defined.");
        // setError("Failed to fetch user. User ID is not defined.");
        return;
      }
      try {
        const updatedUser = await getUserData(user?.prefered_email);
        setUser(updatedUser);
        setPhoneNumber(updatedUser.phone_number);
        setAddress(updatedUser.address);
      } catch (error) {
        // setError("Failed to fetch user.");
        console.error("Error fetching data", error);
      }
      toggleEdit();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      // setError(errorMessage);
    } finally {
      // setLoadRegister(false);
    }
  };

  return (
    <>
      {/* {isLoading && <Loader message={loaderMsg} />}
      {showErrorSnackbar && <Snackbar message={error} />}
      {showSuccessSnackbar && <Snackbar message={isSuccess} />} */}

      {modalOrder && (
        <div>
          <div className="flex flex-col justify-between fixed top-1/2 left-1/2 p-10 transform -translate-x-1/2 -translate-y-1/2 z-10 h-52">
            <h1 className="text-2xl text-black">Confirm your order </h1>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  toggleModalOrder();
                }}
                className="px-4 py-2 bg-white border-2 rounded-md text-gray-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  placeOrder(user?.email, subTotal, cartItem);
                }}
                className="px-4 py-2 bg-black/50 rounded-md text-white border-black hover:bg-black"
              >
                Confirm
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              toggleModalOrder();
            }}
            className="overlay"
          ></div>
        </div>
      )}

      {/* <ModalThankyou
        // session={session}
        // result={result}
        modalThankyou={modalThankyou}
        toggleModalThankyou={toggleModalThankyou}
      /> */}

      {/* <Navbar /> */}
      <div className="flex md:justify-center md:items-center">
        <div className="flex flex-col-reverse md:flex-row px-5 w-full md:max-w-7xl gap-10">
          {edit ? (
            <form className="w-full md:w-1/2 p-5" onSubmit={handleSaveSubmit}>
              <h1 className="text-2xl font-bold my-3">Edit details</h1>
              <div className="mb-4">
                <label
                  htmlFor="first_name"
                  className="block font-semibold mb-2 text-black"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="w-full p-2 border rounded bg-slate-100 text-black"
                  name="first_name"
                  placeholder="first name"
                  // onChange={(e) => setFirstName(e.target.value)}
                  defaultValue={user?.first_name || ""}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="last_name"
                  className="block font-semibold mb-2 text-black"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="w-full p-2 border rounded bg-slate-100 text-black"
                  name="last_name"
                  // onChange={(e) => setLastName(e.target.value)}
                  defaultValue={user?.last_name || ""}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-semibold mb-2 text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border rounded bg-slate-100 text-black"
                  name="email"
                  placeholder="email"
                  // onChange={(e) => setEmail(e.target.value)}
                  defaultValue={user?.email || ""}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone_number"
                  className="block font-semibold mb-2 text-black"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone_number"
                  className="w-full p-2 border rounded bg-slate-100 text-black"
                  name="phone_number"
                  placeholder="phone_number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phone_number || ""}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address_line1"
                  className="block font-semibold mb-2 text-black"
                >
                  Address line 1
                </label>
                <input
                  type="text"
                  id="address_line1"
                  name="address_line1"
                  className="w-full p-2 border rounded bg-slate-100 text-black"
                  placeholder="address line 1"
                  onChange={handleAddressChange}
                  value={address?.address_line1 || ""}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address_line2"
                  className="block font-semibold mb-2 text-black"
                >
                  Address line 2
                </label>
                <input
                  type="text"
                  id="address_line2"
                  name="address_line2"
                  className="w-full p-2 border rounded bg-slate-100 text-black"
                  placeholder="address line 2"
                  onChange={handleAddressChange}
                  value={address?.address_line2 || ""}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block font-semibold mb-2 text-black"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full p-2 border rounded bg-slate-100 text-black"
                  placeholder="eg., Accra"
                  onChange={handleAddressChange}
                  value={address?.city || ""}
                />
              </div>

              <div className="flex gap-3 h-10">
                <button
                  type="button"
                  className="px-2 py-1 bg-white border-2"
                  onClick={toggleEdit}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-2 py-1 w-full bg-emerald-300"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-5 w-full md:w-1/2 p-5">
              <div className=" flex justify-between">
                <h1 className="text-2xl font-bold">Confirm details</h1>
                <div className="flex gap-2 cursor-pointer" onClick={toggleEdit}>
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  edit
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">First Name</h2>
                {isUserLoading ? (
                  // <LoaderSimple />
                  <h1>Loading...</h1>
                ) : (
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-black outline-none"
                    value={user?.first_name}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Last Name</h2>
                {isUserLoading ? (
                  // <LoaderSimple />
                  <h1>Loading...</h1>
                ) : (
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-black outline-none"
                    value={user?.last_name}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Email</h2>
                {isUserLoading ? (
                  // <LoaderSimple />
                  <h1>Loading...</h1>
                ) : (
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-black outline-none"
                    value={user?.email}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Phone Number</h2>
                {isUserLoading ? (
                  // <LoaderSimple />
                  <h1>Loading...</h1>
                ) : (
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-black outline-none"
                    value={user?.phone_number}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Address line 1</h2>

                {isUserLoading ? (
                  // <LoaderSimple />
                  <h1>Loading...</h1>
                ) : (
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-black outline-none"
                    value={user?.address.address_line1}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">Address line 2</h2>

                {isUserLoading ? (
                  // <LoaderSimple />
                  <h1>Loading...</h1>
                ) : user?.address.address_line2 ? (
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-black outline-none"
                    value={user?.address.address_line2}
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-black outline-none"
                    value="N/A"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold">City</h2>
                {isUserLoading ? (
                  <h1>Loading...</h1>
                ) : (
                  // <LoaderSimple />
                  <input
                    type="text"
                    className="w-full p-2 border rounded text-black outline-none"
                    value={user?.address.city}
                  />
                )}
              </div>
              <button
                type="button"
                className="px-4 py-3 my-5 w-full hover:bg-emerald-400 bg-emerald-300 rounded-md text-white"
                onClick={toggleModalOrder}
              >
                Place Order
              </button>
            </div>
          )}

          {/* {isCartLoading ? (
            <div className="flex justify-center items-center">
              <PulseLoader />
            </div>
          ) : ( */}
          <div className="w-full border-l p-5">
            {cartItem.map((item: CartItem) => {
              return (
                <>
                  <div
                    key={item._id}
                    className="flex justify-between md:justify-around mb-3"
                  >
                    <img
                      src={item?.image_url}
                      width={60}
                      height={60}
                      alt="product image"
                    />
                    <h4 className="text-black">
                      GHS {item.price} x {item.quantity}{" "}
                    </h4>
                  </div>
                  <hr className="bg-slate-700 w-full my-2" />
                </>
              );
            })}
            <div className="text-black mt-10 flex flex-col gap-5">
              <div className="flex ">
                <h1 className="font-bold">Order Summary</h1>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  className="p-2 border-black border rounded text-black w-3/5"
                  placeholder="apply discount code"
                />
                <button
                  type="button"
                  className="px-4 py-2 my-5 bg-black text-white rounded-md"
                >
                  Apply
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm w-full">
                  <h4>Delivery</h4>
                  <h2>GHS 50.00 </h2>
                </div>
                <div className="flex justify-between text-sm w-full">
                  <h4>Discount</h4>
                  <h2>GHS 00.00 </h2>
                </div>
                <div className="flex justify-between text-sm w-full">
                  <h4>Tax</h4>
                  <h2>GHS 00.00 </h2>
                </div>
                <hr className="bg-slate-700 w-full my-2" />
                <div className="flex justify-between text-sm">
                  <h4>Subtotal</h4>
                  <h2>GHS {subTotal}.00 </h2>
                </div>
                <div className="flex justify-between">
                  <h4 className="font-bold text-xl">Total</h4>
                  <h2 className="font-bold text-xl">GHS {subTotal + 50}.00 </h2>
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
}
