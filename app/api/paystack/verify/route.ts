// import UserModel from "@/db/models/userModel";
import axios from "axios";

export const POST = async (request: Request) => {
  const { reference } = await request.json();

  console.log("reference:", reference);

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { message, data } = response.data;

    if (message === "Verification successful") {
      // const user = await UserModel.findOne({ email });

      return new Response(
        JSON.stringify({
          data,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response("Payment verification failed!", { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
