"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUserData } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { FormSkeletonCard } from "@/components/skeleton/FormSkeleton";
import { AlertDestructive } from "@/components/ErrorAlert";
import { useUpdateUserMutation } from "@/redux/slices/usersApiSlice";
import SpinnerSmall from "@/components/Loader/Loader-two/page";
import { Label } from "@/components/ui/label";

type user = {
  id?: string;
  provided_id?: string;
  email: string;
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
  phone_number?: string;
  organizations?: Array<string>;
  identities?: Array<{
    type?: string;
    identity?: string;
  }>;
};

type Props = {
  email: string;
};

export default function EditUserForm({ email }: Props) {
  const [userData, setUserData] = useState<user>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState({
    address_line1: "",
    address_line2: "",
    city: "",
    postal_code: "",
  });
  const [isloading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const user = await getUserData(email);
        setUserData(user);
        setPhoneNumber(user.phone_number);
        setAddress(user.address);
      } catch {
        setErrorMsg("Failed to fetch user");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [email]);

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

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowSpinner(true);

    const updatedUser = {
      preferred_email: userData?.email,
      picture: userData?.picture,
      last_name: userData?.last_name,
      first_name: userData?.first_name,
      is_suspended: userData?.is_suspended,
      phone_number: phoneNumber,
      address,
    };
    try {
      const response = await updateUser(updatedUser).unwrap();
      if (response.message === `${userData?.first_name} updated successfully`) {
        // setSuccess here later
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowSpinner(false);
      router.back();
    }
  };

  return (
    <>
      {isloading ? (
        <FormSkeletonCard />
      ) : errorMsg ? (
        <AlertDestructive errorMessage={errorMsg} />
      ) : (
        <div className="flex flex-col-reverse w-full md:w-[60rem]">
          <div className="px-4 flex-1 flex flex-col justify-center items-center">
            <h1 className="text-xl font-bold my-4 grid place-content-center mt-6">
              Edit profile
            </h1>
            <form onSubmit={handleSave} className="w-full">
              <div className="mb-4 flex flex-col md:flex-row md:gap-10 gap-5">
                <Label htmlFor="first_name" className="md:w-1/2 font-bold ">
                  First Name
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    className="mt-4"
                    placeholder={userData?.first_name}
                    disabled
                  />
                </Label>
                <Label htmlFor="last_name" className="md:w-1/2 font-bold ">
                  Last Name
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    className="mt-4"
                    placeholder={userData?.last_name}
                    disabled
                  />
                </Label>
              </div>
              <div className="mb-4 flex flex-col md:flex-row md:gap-10 gap-5">
                <Label htmlFor="email" className="md:w-1/2 font-bold ">
                  Email
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="mt-4"
                    placeholder={userData?.email}
                    disabled
                  />
                </Label>
                <Label htmlFor="phone_number" className="md:w-1/2 font-bold ">
                  Phone number
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="text"
                    className="mt-4 font-normal"
                    placeholder="phone number"
                    value={phoneNumber || "N/A"}
                    onChange={onPhoneChanged}
                  />
                </Label>
              </div>
              <div className="mb-4 flex flex-col md:flex-row md:gap-10 gap-5">
                <Label htmlFor="address_line1" className="md:w-1/2 font-bold ">
                  Address line 1
                  <Input
                    id="address_line1"
                    name="address_line1"
                    type="text"
                    className="my-4 font-normal"
                    placeholder="address line 1"
                    value={address.address_line1}
                    onChange={onAddressChanged("address_line1")}
                  />
                </Label>
                <Label htmlFor="address_line2" className="md:w-1/2 font-bold ">
                  Address line 2
                  <Input
                    id="address_line2"
                    name="address_line2"
                    type="text"
                    placeholder="address line 2"
                    className="my-4"
                    value={address.address_line2}
                    onChange={onAddressChanged("address_line2")}
                  />
                </Label>
                <Label htmlFor="city" className="md:w-1/2 font-bold ">
                  City
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="city"
                    className="my-4 font-normal"
                    value={address.city}
                    onChange={onAddressChanged("city")}
                  />
                </Label>
              </div>
              <div className="mb-4 flex flex-col md:flex-row md:gap-10 gap-5">
                <Label htmlFor="postal_code" className="w-full font-bold">
                  Postal code
                  <Input
                    id="postal_code"
                    name="postal_code"
                    type="text"
                    className="mt-4 font-normal"
                    placeholder="postal code"
                    value={address.postal_code}
                    onChange={onAddressChanged("postal_code")}
                  />
                </Label>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => router.back()}
                >
                  Back
                </Button>
                <Button type="submit">
                  {showSpinner ? <SpinnerSmall /> : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
