import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import localFont from "next/font/local";

const poppins = localFont({
  src: "../../app/fonts/Poppins-Medium.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

type Props = {
  user: User | undefined;
  toggleModalOrder: () => void;
  selectedOption: string;
  toggleSpinner: () => void;
  placeOrderAndHandlePayment: () => void;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  handleOptionChange: (value: string) => void;
};

export default function CheckoutForm({
  user,
  toggleModalOrder,
  selectedOption,
  placeOrderAndHandlePayment,
  handleOptionChange,
}: Props) {
  const [errors, setErrors] = useState<{
    phone_number?: string;
    address_line1?: string;
    city?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    if (!user?.phone_number?.trim()) {
      newErrors.phone_number =
        "Phone number is required, click edit to fill this field";
      isValid = false;
    }
    if (!user?.address?.address_line1?.trim()) {
      newErrors.address_line1 =
        "Address is required, click edit to fill this field";
      isValid = false;
    }
    if (!user?.address?.city?.trim()) {
      newErrors.city = "City is required, click edit to fill this field";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <>
      <div className={`flex flex-col gap-2 `}>
        <h2 className="font-semibold">First Name</h2>

        <input
          type="text"
          className={`w-full p-2 border rounded text-black outline-none ${poppins.className}`}
          defaultValue={user?.first_name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Last Name</h2>

        <input
          type="text"
          className={`w-full p-2 border rounded text-black outline-none ${poppins.className}`}
          defaultValue={user?.last_name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Email</h2>

        <input
          type="text"
          className={`w-full p-2 border rounded text-black outline-none ${poppins.className}`}
          defaultValue={user?.email}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Phone Number</h2>
        <input
          type="text"
          className={`w-full p-2 border rounded text-black outline-none ${
            poppins.className
          } ${errors.phone_number ? "border-red-500" : ""}`}
          defaultValue={user?.phone_number}
        />
        {errors.phone_number && (
          <span className="text-red-500 text-sm">{errors.phone_number}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Address line 1</h2>
        <input
          type="text"
          className={`w-full p-2 border rounded text-black outline-none ${
            poppins.className
          } ${errors.address_line1 ? "border-red-500" : ""}`}
          defaultValue={user?.address?.address_line1}
        />
        {errors.address_line1 && (
          <span className="text-red-500 text-sm">{errors.address_line1}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Address line 2</h2>

        {user?.address?.address_line2 ? (
          <input
            type="text"
            className={`w-full p-2 border rounded text-black outline-none ${poppins.className}`}
            defaultValue={user?.address.address_line2}
          />
        ) : (
          <input
            type="text"
            className={`w-full p-2 border rounded text-black outline-none ${poppins.className}`}
            defaultValue="N/A"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">City</h2>
        <input
          type="text"
          className={`w-full p-2 border rounded text-black outline-none ${
            poppins.className
          } ${errors.city ? "border-red-500" : ""}`}
          defaultValue={user?.address?.city}
        />
        {errors.city && (
          <span className="text-red-500 text-sm">{errors.city}</span>
        )}
      </div>
      <RadioGroup
        defaultValue={selectedOption}
        onValueChange={handleOptionChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Pay before delivery" id="r1" />
          <Label htmlFor="r1">
            <strong className={poppins.className}>Pay Before Delivery</strong>
            <br />
            <span className="text-xs text-gray-500 mt-2">
              <em>
                Get it faster with priority delivery and no payment hassle at
                the door!
              </em>
            </span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Pay after delivery" id="r2" />
          <Label htmlFor="r2">
            <strong className={poppins.className}>Pay After Delivery</strong>
            <br />
            <span className="text-xs text-gray-500 mt-2">
              <em>
                Pay only after receiving your order, for complete peace of mind!
              </em>
            </span>
          </Label>
        </div>
      </RadioGroup>

      <Button
        type="button"
        className="px-4 py-4 my-5 w-full bg-black rounded-md text-white"
        onClick={() => {
          if (!validateForm()) {
            return;
          }

          if (selectedOption === "Pay after delivery") {
            toggleModalOrder();
          } else {
            placeOrderAndHandlePayment();
          }
        }}
      >
        Place Order
      </Button>
    </>
  );
}
