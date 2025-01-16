import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartItemSchema = new Schema<CartItem>(
  {
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "cart", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const CartItem =
  mongoose.models.cartItem ||
  mongoose.model<CartItem>("cartItem", cartItemSchema);

export default CartItem;
