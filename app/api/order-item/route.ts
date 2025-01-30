// import Order from "@/db/models/orderModel";
import { connectDB } from "@/db/mongodb";
import OrderedItem from "@/db/models/orderedItem";

export const GET = async () => {
  try {
    await connectDB();

    // const order = Order.find().lean();

    const orderItems = await OrderedItem.find()
      .populate("order")
      .populate("product")
      .lean();

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
