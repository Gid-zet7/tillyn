import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import localFont from "next/font/local";
import { useUpdateUserMutation } from "@/redux/slices/usersApiSlice";
// import LocationPicker from "../map/LocationPicker";

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
  const [updateUser] = useUpdateUserMutation();
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || "");
  const [addressLine1, setAddressLine1] = useState(
    user?.address?.address_line1 || ""
  );
  const [addressLine2, setAddressLine2] = useState(
    user?.address?.address_line2 || ""
  );
  const [city, setCity] = useState(user?.address?.city || "");
  // const [location, setLocation] = useState<{
  //   lat: number;
  //   lng: number;
  // } | null>(null);

  const [errors, setErrors] = useState<{
    phone_number?: string;
    address_line1?: string;
    city?: string;
  }>({});

  // const handleLocationSelect = (selectedLocation: {
  //   lat: number;
  //   lng: number;
  //   address: string;
  // }) => {
  //   setLocation({ lat: selectedLocation.lat, lng: selectedLocation.lng });
  //   setAddressLine1(selectedLocation.address);
  //   // Extract city from address if possible
  //   const addressParts = selectedLocation.address.split(",");
  //   if (addressParts.length >= 2) {
  //     setCity(addressParts[addressParts.length - 2].trim());
  //   }
  // };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    if (!phoneNumber?.trim()) {
      newErrors.phone_number = "Phone number is required";
      isValid = false;
    }
    if (!addressLine1?.trim()) {
      newErrors.address_line1 = "Address is required";
      isValid = false;
    }
    if (!city?.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Update user information
      if (user?._id) {
        await updateUser({
          preferred_email: email,
          phone_number: phoneNumber,
          address: {
            address_line1: addressLine1,
            address_line2: addressLine2,
            city,
            // coordinates: location
            //   ? {
            //       latitude: location.lat,
            //       longitude: location.lng,
            //     }
            //   : undefined,
          },
        }).unwrap();
      }

      // Proceed with order placement
      if (selectedOption === "Pay after delivery") {
        toggleModalOrder();
      } else {
        placeOrderAndHandlePayment();
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <>
      <div className={`flex flex-col gap-2 `}>
        <h2 className="font-semibold">First Name</h2>
        <input
          type="text"
          className={`w-full p-2 border rounded outline-none ${poppins.className}`}
          value={user?.first_name || ""}
          disabled
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Last Name</h2>
        <input
          type="text"
          className={`w-full p-2 border rounded outline-none ${poppins.className}`}
          value={user?.last_name || ""}
          disabled
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Email</h2>
        <input
          type="email"
          className={`w-full p-2 border rounded outline-none ${poppins.className}`}
          value={email}
          disabled
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Phone Number</h2>
        <input
          type="text"
          className={`w-full p-2 border rounded outline-none ${
            poppins.className
          } ${errors.phone_number ? "border-red-500" : ""}`}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errors.phone_number && (
          <span className="text-red-500 text-sm">{errors.phone_number}</span>
        )}
      </div>

      {/* <div className="flex flex-col gap-4 mt-4">
        <h2 className="font-semibold">Select Location on Map</h2>
        <LocationPicker onLocationSelect={handleLocationSelect} />
      </div> */}

      <div className="flex flex-col gap-2 mt-4">
        <h2 className="font-semibold">Address line 1</h2>
        <input
          type="text"
          className={`w-full p-2 border rounded outline-none ${
            poppins.className
          } ${errors.address_line1 ? "border-red-500" : ""}`}
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
        />
        {errors.address_line1 && (
          <span className="text-red-500 text-sm">{errors.address_line1}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">Address line 2</h2>
        <input
          type="text"
          className={`w-full p-2 border rounded outline-none ${poppins.className}`}
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          placeholder="Optional"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">City</h2>
        <input
          type="text"
          className={`w-full p-2 border rounded outline-none ${
            poppins.className
          } ${errors.city ? "border-red-500" : ""}`}
          value={city}
          onChange={(e) => setCity(e.target.value)}
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
        className="px-4 py-4 my-5 w-full rounded-md"
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>
    </>
  );
}
