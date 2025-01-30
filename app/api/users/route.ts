import UserModel from "@/db/models/userModel";
import { connectDB } from "@/db/mongodb";

export const GET = async () => {
  try {
    await connectDB();

    const users = await UserModel.find().populate("address").lean();

    if (users.length === 0) {
      return new Response("No users found", { status: 404 });
    }

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    // console.log(error);
    return new Response("Failed to fetch users", { status: 500 });
  }
};
