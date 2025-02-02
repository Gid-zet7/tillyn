import type { Metadata } from "next";
import User from "@/components/user/cards/User";
import { getUserData } from "@/lib/actions";

type Params = {
  params: {
    email: string;
  };
};

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const { email } = await params;
  const userData: Promise<User> = getUserData(email);
  const user: User = await userData;

  if (!user?.first_name) {
    return {
      title: "User not found",
    };
  }

  return {
    title: `${user?.first_name}'s Profile | Tillyn`,
    description: `View ${user?.first_name}'s profile details on Tillyn. Explore account information, preferences, and activity in one place.`,
  };
};

export default async function UserPage({ params }: Params) {
  const { email } = await params;
  return <User email={email} />;
}
