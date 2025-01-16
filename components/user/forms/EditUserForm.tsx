"use client";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type user = {
  id?: string;
  provided_id?: string;
  preferred_email?: string;
  username?: string;
  last_name?: string;
  first_name?: string;
  is_suspended?: boolean;
  picture?: string;
  total_sign_ins?: number | null;
  failed_sign_ins?: number | null;
  last_signed_in?: string | null;
  created_on?: string | null;
  organizations?: Array<string>;
  identities?: Array<{
    type?: string;
    identity?: string;
  }>;
};

type EditUserFormProps = {
  userData: user;
};

export default function EditUserForm({ userData }: EditUserFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState({
    address_line1: "",
    address_line2: "",
    city: "",
    postal_code: "",
  });

  const onPhoneChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const onAddressChanged =
    (field: keyof typeof address) => (event: ChangeEvent<HTMLInputElement>) => {
      setAddress((prevAddress) => ({
        ...prevAddress,
        [field]: event.target.value,
      }));
    };

  const updateUser = async () => {
    const updatedUser = {
      preferred_email: userData.preferred_email,
      picture: userData.picture,
      last_name: userData.last_name,
      first_name: userData.first_name,
      is_suspended: userData.is_suspended,
      phone_number: phoneNumber,
      address,
    };
    try {
      const response = await fetch("http://localhost:3000/api/users/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={updateUser}>
        <Input type="text" placeholder={userData.first_name} />
        <Input type="text" placeholder={userData.last_name} />
        <Input type="email" placeholder={userData.preferred_email} />
        <Input
          type="text"
          placeholder="phone number"
          value={phoneNumber}
          onChange={onPhoneChanged}
        />
        <Input
          type="text"
          placeholder="address line 1"
          value={address.address_line1}
          onChange={onAddressChanged("address_line1")}
        />
        <Input
          type="text"
          placeholder="address line 2"
          value={address.address_line2}
          onChange={onAddressChanged("address_line2")}
        />
        <Input
          type="text"
          placeholder="city"
          value={address.city}
          onChange={onAddressChanged("city")}
        />
        <Input
          type="text"
          placeholder="postal code"
          value={address.postal_code}
          onChange={onAddressChanged("postal_code")}
        />
        {/* <Input type="text" placeholder="" /> */}
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
