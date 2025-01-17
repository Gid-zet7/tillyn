import React from "react";
import { Button } from "../ui/button";

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
  return (
    <>
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
            placeholder="first name eg. John"
            disabled
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
            className="w-full p-2 border rounded bg-slate-100 text-black"
            name="phone_number"
            placeholder="phone number "
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
          <label htmlFor="city" className="block font-semibold mb-2 text-black">
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
          <Button
            type="button"
            variant={"outline"}
            // className="px-2 py-1 bg-white border-2"
            onClick={toggleEdit}
          >
            Cancel
          </Button>

          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
}
