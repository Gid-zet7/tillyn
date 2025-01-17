import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { payStackHandler, verifyPayment } from "@/lib/actions";

type Props = {
  user: User | undefined;
  toggleModalOrder: () => void;
  toggleModalThankyou: () => void;
  selectedOption: string;
  subTotal: number;
  placeOrder: () => void;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckoutForm({
  user,
  toggleModalOrder,
  toggleModalThankyou,
  selectedOption,
  setSelectedOption,
  subTotal,
  placeOrder,
  handleOptionChange,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderPlaced, setOrderPlaced] = useState(false); // Track if order has been placed

  useEffect(() => {
    if (searchParams.get("reference") && user?.email && !orderPlaced) {
      handleCallback();
    }
  }, [searchParams, user?.email]);

  const handlePayment = async () => {
    try {
      if (user?.email) {
        const res = await payStackHandler(user.email, subTotal);
        console.log(res);
        router.push(res.data.data.authorization_url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCallback = async () => {
    // Use router.query to get the query parameters from the callback URL
    const reference = searchParams.get("reference");

    // Check if the reference is available and handle the logic
    if (reference && user?.email) {
      console.log("Transaction reference:", reference);

      try {
        const result = await verifyPayment(user.email, reference);
        console.log("Payment verification result:", result);
        setOrderPlaced(true);
        placeOrder();
      } catch (error) {
        console.error("Payment verification error:", error);
      }
    } else {
      console.error("Transaction reference or email is not available.");
    }
    router.push("http://localhost:3000/");
    toggleModalThankyou();
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">First Name</h2>

        <input
          type="text"
          className="w-full p-2 border rounded text-black outline-none"
          defaultValue={user?.first_name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Last Name</h2>

        <input
          type="text"
          className="w-full p-2 border rounded text-black outline-none"
          defaultValue={user?.last_name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Email</h2>

        <input
          type="text"
          className="w-full p-2 border rounded text-black outline-none"
          defaultValue={user?.email}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Phone Number</h2>

        <input
          type="text"
          className="w-full p-2 border rounded text-black outline-none"
          defaultValue={user?.phone_number}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Address line 1</h2>

        <input
          type="text"
          className="w-full p-2 border rounded text-black outline-none"
          defaultValue={user?.address?.address_line1}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Address line 2</h2>

        {user?.address?.address_line2 ? (
          <input
            type="text"
            className="w-full p-2 border rounded text-black outline-none"
            defaultValue={user?.address.address_line2}
          />
        ) : (
          <input
            type="text"
            className="w-full p-2 border rounded text-black outline-none"
            defaultValue="N/A"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">City</h2>

        <input
          type="text"
          className="w-full p-2 border rounded text-black outline-none"
          defaultValue={user?.address?.city}
        />
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="options"
            value="Pay before delivery"
            checked={selectedOption === "Pay before delivery"}
            onChange={handleOptionChange}
          />
          Pay before delivery
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="options"
            value="Pay after delivery"
            checked={selectedOption === "Pay after delivery"}
            onChange={handleOptionChange}
          />
          Pay after delivery
        </label>
      </div>
      <Button
        type="button"
        className="px-4 py-4 my-5 w-full bg-black rounded-md text-white"
        onClick={() => {
          if (selectedOption === "Pay after delivery") {
            toggleModalOrder();
          } else {
            handlePayment();
          }
        }}
      >
        Place Order
      </Button>
    </>
  );
}
