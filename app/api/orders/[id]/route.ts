import Order from "@/db/models/orderModel";
import { connectDB } from "@/db/mongodb";

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params }: Params) => {
  const { id } = await params;
  await connectDB();

  const order = await Order.findById(id).lean();

  if (!order) return new Response("Order not found", { status: 400 });

  return new Response(JSON.stringify(order), { status: 200 });
};
