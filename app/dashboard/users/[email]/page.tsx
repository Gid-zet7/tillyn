import React from "react";
import UserProfile from "@/components/user/cards/UserProfile";

type Params = {
  params: {
    email: string;
  };
};

export default async function UserPage({ params }: Params) {
  const { email } = await params;
  // console.log(email);

  return <UserProfile email={email} />;
}
