import Order from "@/db/models/orderModel";
import { connectDB } from "@/db/mongodb";

export const PATCH = async (request: Request) => {
  try {
    const { id, status, payment_status } = await request.json();

    // Validate that the ID is provided
    if (!id)
      return new Response(JSON.stringify({ error: "Id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });

    await connectDB();

    // Find the order by ID
    const order = await Order.findById(id).exec();
    if (!order)
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });

    if (status) order.status = status;
    if (payment_status) order.payment_status = payment_status;

    // Save the updated order
    const updatedOrder = await order.save();

    return new Response(
      JSON.stringify({
        message: `Order with ID ${updatedOrder._id} updated successfully`,
        order: updatedOrder,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
