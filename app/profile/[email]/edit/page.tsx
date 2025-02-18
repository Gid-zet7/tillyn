import type { Metadata } from "next";
import { getUserData } from "@/lib/actions";
import EditUserForm from "@/components/user/forms/EditUserForm";

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

  if (!user) {
    return {
      title: "User not found",
    };
  }

  return {
    title: `Edit ${user?.first_name}'s Profile | Tillyn`,
    description: `Update and manage ${user?.first_name}'s profile details on Tillyn. Edit personal information, preferences, and account settings easily.`,
  };
};

export default async function EditEmployeePage({ params }: Params) {
  const { email } = await params;
  return (
    <>
      <section className="flex items-center justify-center">
        <EditUserForm email={email} />
      </section>
    </>
  );
}
