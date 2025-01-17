import UserModel from "@/db/models/userModel";
import Order from "@/db/models/orderModel";
import axios from "axios";

export const POST = async (request: Request) => {
  const { email, reference } = await request.json();

  console.log("reference:", reference);

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_TEST_KEY}`,
        },
      }
    );

    const { message, data } = response.data;

    if (message === "Verification successful") {
      const user = await UserModel.findOne({ email });
      console.log(user);

      if (user) {
        const order = await Order.findOne({ user });
        console.log(order);
        order.payment_status = "Paid";

        await order.save();
      }

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
