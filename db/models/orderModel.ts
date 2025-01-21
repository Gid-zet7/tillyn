import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema<Order>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    order_date: { type: Date, default: Date.now },
    address: {
      address_line1: { type: String, required: true },
      address_line2: String,
      city: { type: String, required: false },
      postal_code: String,
    },
    status: { type: String, default: "Pending" },
    total_amount: { type: Number, required: true },
    payment_status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Order =
  mongoose.models.order || mongoose.model<Order>("order", orderSchema);

export default Order;
