import Cart from "@/db/models/cartModel";
import { connectDB } from "@/db/mongodb";

export const GET = async () => {
  try {
    await connectDB();

    const cart = await Cart.find().lean();

    if (cart.length === 0) {
      return new Response("No cart created yet", { status: 404 });
    }

    return new Response(JSON.stringify(cart), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Failed to fetch carts", { status: 500 });
  }
};
