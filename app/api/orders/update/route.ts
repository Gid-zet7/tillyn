import Order from "@/db/models/orderModel";
import { connectDB } from "@/db/mongodb";

export const PATCH = async (request: Request) => {
  try {
    const { id, status, payment_status } = await request.json();

    // Validate that the ID is provided
    if (!id) return new Response("Id is required", { status: 400 });

    await connectDB();

    // Find the order  by ID
    const order = await Order.findById(id).exec();
    if (!order) return new Response("Order not found", { status: 404 });

    if (status) order.status = status;
    if (payment_status) order.payment_status = payment_status;

    // Save the updated product
    const updatedOrder = await order.save();

    return new Response(
      `Order with ID ${updatedOrder._id} updated successfully`,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
