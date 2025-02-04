import Order from "@/db/models/orderModel";
import { connectDB } from "@/db/mongodb";
import OrderedItem from "@/db/models/orderedItem";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return new Response("Category not provided", { status: 400 });
    }

    await connectDB();

    const order = Order.find().lean();

    const orderItems = await OrderedItem.find({ order: id }).exec();

    if (orderItems.length === 0) {
      return new Response("No products posted yet", { status: 404 });
    }

    return new Response(JSON.stringify(orderItems), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    // console.log(error);
    return new Response("Failed to fetch orderItems", { status: 500 });
  }
};
