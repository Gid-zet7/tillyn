import Cart from "@/db/models/cartModel";
import { connectDB } from "@/db/mongodb";
import CartItem from "@/db/models/cartItem";

export const GET = async () => {
  try {
    await connectDB();

    const cart = await Cart.find().exec();

    const cartItem = await CartItem.find()
      .populate("cart")
      .populate("product")
      .lean();

    if (cartItem.length === 0) {
      return new Response("No items selected yet", { status: 404 });
    }

    return new Response(JSON.stringify(cartItem), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Failed to fetch carts", { status: 500 });
  }
};
