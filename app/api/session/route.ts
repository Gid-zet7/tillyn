import { Users, init } from "@kinde/management-api-js";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

init();

export const GET = async () => {
  try {
    const session = await getKindeServerSession().getUser();
    const userData = await Users.getUserData({ id: session.id });
    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
