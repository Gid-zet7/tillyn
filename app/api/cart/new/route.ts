import { connectDB } from "@/db/mongodb";
import Cart from "@/db/models/cartModel";

export const POST = async (request: Request) => {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    await connectDB();

    // Check if the user already has a cart
    let cart = await Cart.findOne({ user: userId }).exec();

    if (cart) {
      return new Response("Cart already exists for this user", { status: 400 });
    }

    // Create a new cart for the user
    cart = new Cart({ user: userId });
    await cart.save();

    return new Response(JSON.stringify(cart), { status: 201 });
  } catch (error) {
    return new Response("Failed to create cart", { status: 500 });
  }
};
