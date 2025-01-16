import CartItem from "@/db/models/cartItem";
import Cart from "@/db/models/cartModel";
import { connectDB } from "@/db/mongodb";

export const DELETE = async (request: Request) => {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response("An Id is required", { status: 400 });
    }

    await connectDB();

    const cart = await Cart.findOne({ user: id }).exec();
    if (!cart) {
      return new Response("Cart not found", { status: 404 });
    }

    // Find the items in the cart
    const cartItems = await CartItem.find({ cart: cart._id })
      .populate("product")
      .exec();

    if (!cartItems.length) {
      return new Response("No items in the cart", { status: 400 });
    }

    // Clear the user's cart after creating the order
    await CartItem.deleteMany({ cart: cart._id });
    await Cart.findByIdAndDelete(cart._id);

    return new Response(`Items cleared`, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
