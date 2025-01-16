import Order from "@/db/models/orderModel";
import { connectDB } from "@/db/mongodb";

export const DELETE = async (request: Request) => {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response("An Id is required", { status: 400 });
    }

    await connectDB();

    const order = await Order.findById(id).exec();

    if (!order) {
      return new Response("Order not found", { status: 404 });
    }

    await order.deleteOne();

    return new Response(`Order with id ${id} deleted successfully`, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
