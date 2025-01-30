import axios from "axios";
import { connectDB } from "@/db/mongodb";
import UserModel from "@/db/models/userModel";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const POST = async (request: Request) => {
  const { email, amount } = await request.json();

  if (!email) return new Response("email is required", { status: 400 });
  if (!amount) return new Response("Invalid amount", { status: 400 });

  await connectDB();

  const findUser = await UserModel.findOne({ email }).exec();

  if (!findUser) {
    return new Response("Please login into your account", { status: 409 });
  }

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        currency: "GHS",
        callback_url: `${SERVER_URL}/checkout`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(
      JSON.stringify({
        data: response.data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch {
    // console.log(error);
    return new Response("Failed!", { status: 500 });
  }
};
