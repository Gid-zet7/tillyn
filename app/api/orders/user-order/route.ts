import Order from "@/db/models/orderModel";
import { connectDB } from "@/db/mongodb";
import UserModel from "@/db/models/userModel";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return new Response("An email is required", { status: 400 });
    }

    await connectDB();

    const findUser = await UserModel.findOne({ email }).exec();

    if (!findUser) {
      return new Response("User not found", { status: 404 });
    }

    // Fetch orders for the user
    const orders = await Order.find({ user: findUser._id })
      .sort({ createdAt: -1 })
      .lean();

    if (!orders.length) {
      return new Response("Order not found", { status: 400 });
    }

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response("Failed to fetch orders and order items", {
      status: 500,
    });
  }
};
