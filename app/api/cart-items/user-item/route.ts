import Cart from "@/db/models/cartModel";
import { connectDB } from "@/db/mongodb";
import CartItem from "@/db/models/cartItem";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response("An Id is required", { status: 400 });
    }

    await connectDB();

    const cart = await Cart.find({ user: id }).exec();

    const cartIdToString = cart.map((cartItm) => cartItm._id.toString());

    // Fetch cart items associated with the specific cart ID
    const cartItems = await CartItem.find({ cart: cartIdToString })
      .populate("cart")
      .populate("product")
      .lean();

    if (cartItems.length === 0) {
      return new Response("No items found for this cart", { status: 404 });
    }

    return new Response(JSON.stringify(cartItems), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // console.log(error);
    return new Response("Failed to fetch cart items", { status: 500 });
  }
};
