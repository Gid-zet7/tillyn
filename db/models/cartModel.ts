import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema<Cart>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

const Cart = mongoose.models.cart || mongoose.model<Cart>("cart", cartSchema);

export default Cart;
