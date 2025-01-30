import UserModel from "@/db/models/userModel";
import { connectDB } from "@/db/mongodb";

type Params = {
  params: {
    email: string;
  };
};

export const GET = async (request: Request, { params }: Params) => {
  const { email } = await params;
  try {
    await connectDB();
    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    // console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
