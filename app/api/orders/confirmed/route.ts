import Order from "@/db/models/orderModel";
import { connectDB } from "@/db/mongodb";

export const GET = async () => {
  try {
    await connectDB();

    // Fetch orders where status is "delivered"
    const orders = await Order.find({
      status: { $regex: "^confirmed$", $options: "i" },
    })
      .populate("user")
      .sort({ orderDate: -1 })
      .lean();

    if (!orders.length) return new Response("No orders found", { status: 404 });

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching delivered orders:", error);
    return new Response("Failed to fetch delivered orders", { status: 500 });
  }
};
