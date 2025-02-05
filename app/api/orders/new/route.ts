import Order from "@/db/models/orderModel";
import { connectDB } from "@/db/mongodb";
import OrderedItem from "@/db/models/orderedItem";
import UserModel from "@/db/models/userModel";

export const POST = async (request: Request) => {
  try {
    const { email, subtotal, cartItem } = await request.json();

    // Validate the input data
    if (!email) {
      return new Response("User email is required", { status: 400 });
    }

    await connectDB();

    const findUser = await UserModel.findOne({ email }).exec();

    if (!findUser)
      return new Response("Login to place an order", { status: 400 });

    // // Create a new order
    const order = new Order({
      user: findUser._id,
      total_amount: subtotal,
      address: findUser.address,
    });
    await order.save();

    // // Create order items based on the cart items
    await Promise.all(
      cartItem.map(async (cartItem: CartItem) => {
        const orderItem = new OrderedItem({
          order: order._id,
          product: cartItem._id,
          quantity: cartItem.quantity,
          price: cartItem.price,
          brand: cartItem.brand,
        });
        await orderItem.save();
        return orderItem;
      })
    );

    return new Response(JSON.stringify({ order, user: findUser }), {
      status: 200,
    });
  } catch {
    // console.log(error);
    return new Response("Failed to create order", { status: 500 });
  }
};
