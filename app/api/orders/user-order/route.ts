import Order from "@/db/models/orderModel";
import { connectDB } from "@/db/mongodb";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response("An Id is required", { status: 400 });
    }

    await connectDB();

    // Fetch orders for the user
    const orders = await Order.find({ user: id }).lean();

    if (!orders.length) {
      return new Response("Order not found", { status: 400 });
    }

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch orders and order items", {
      status: 500,
    });
  }
};
