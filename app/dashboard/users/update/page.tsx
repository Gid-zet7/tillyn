import { Users, init } from "@kinde/management-api-js";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import EditUserForm from "@/components/user/forms/EditUserForm";

init();

export default async function UpdateUser() {
  try {
    const session = await getKindeServerSession().getUser();
    const userData = await Users.getUserData({ id: session.id });
    return (
      <div>
        <EditUserForm userData={userData} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
