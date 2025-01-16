import UserModel from "@/db/models/userModel";
import { connectDB } from "@/db/mongodb";

export const GET = async (request: Request) => {
  console.log("api");
  try {
    await connectDB();

    const users = await UserModel.find().populate("address").lean();
    console.log(users);

    if (users.length === 0) {
      return new Response("No users found", { status: 404 });
    }

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Failed to fetch users", { status: 500 });
  }
};
