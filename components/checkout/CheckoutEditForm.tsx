import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  user: User | undefined;
  setPhoneNumber: any | undefined;
  phone_number: string;
  address: Address;
  toggleEdit: () => void;
  handleAddressChange: (e: any) => void;
  handleSaveSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function CheckoutEditForm({
  user,
  handleSaveSubmit,
  setPhoneNumber,
  phone_number,
  handleAddressChange,
  address,
  toggleEdit,
}: Props) {
  const [errors, setErrors] = useState<{
    phone_number?: string;
    address_line1?: string;
    city?: string;
  }>({});

  const validateForm = (e: React.FormEvent<HTMLFormElement>): boolean => {
    const newErrors: typeof errors = {};
    const form = e.currentTarget;
    
    // Phone validation
    const phoneValue = form.phone_number.value.trim();
    if (!phoneValue) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(phoneValue)) {
      newErrors.phone_number = "Please enter a valid phone number";
    }

    // Address validation
    const addressValue = form.address_line1.value.trim();
    if (!addressValue) {
      newErrors.address_line1 = "Address is required";
    }

    // City validation
    const cityValue = form.city.value.trim();
    if (!cityValue) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(e)) {
      await handleSaveSubmit(e);
    }
  };

  return (
    <>
      <form className="w-full md:w-1/2 p-5" onSubmit={onSubmit}>
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
            placeholder="first name eg. John"
            disabled
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
            disabled
            placeholder="last name eg. Doe"
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
            disabled
            placeholder="email eg. johndoe123@gmail.com"
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
            className={cn(
              "w-full p-2 border rounded bg-slate-100 text-black",
              errors.phone_number && "border-red-500"
            )}
            name="phone_number"
            placeholder="phone number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phone_number || ""}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
          )}
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
            className={cn(
              "w-full p-2 border rounded bg-slate-100 text-black",
              errors.address_line1 && "border-red-500"
            )}
            name="address_line1"
            placeholder="Enter your address"
            onChange={handleAddressChange}
            value={address?.address_line1 || ""}
          />
          {errors.address_line1 && (
            <p className="text-red-500 text-sm mt-1">{errors.address_line1}</p>
          )}
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
            className="w-full p-2 border rounded bg-slate-100 text-black"
            name="address_line2"
            placeholder="Apartment, suite, etc. (optional)"
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
            className={cn(
              "w-full p-2 border rounded bg-slate-100 text-black",
              errors.city && "border-red-500"
            )}
            name="city"
            placeholder="Enter your city"
            onChange={handleAddressChange}
            value={address?.city || ""}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={toggleEdit}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
