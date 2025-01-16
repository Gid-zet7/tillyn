import Order from "@/db/models/orderModel";
import { connectDB } from "@/db/mongodb";

export const GET = async (request: Request) => {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate("user")
      .sort({ orderDate: -1 })
      .lean();

    if (!orders?.length) return new Response("No order found", { status: 400 });

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch order", { status: 500 });
  }
};
