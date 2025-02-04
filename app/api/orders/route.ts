import Order from "@/db/models/orderModel";
import UserModel from "@/db/models/userModel";
import { connectDB } from "@/db/mongodb";

export const GET = async () => {
  try {
    await connectDB();

    const users = await UserModel.find();

    const orders = await Order.find()
      .populate("user")
      .sort({ createdAt: -1 })
      .lean();

    if (!orders?.length) return new Response("No order found", { status: 404 });

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch {
    // console.log(error);
    return new Response("Failed to fetch order", { status: 500 });
  }
};
