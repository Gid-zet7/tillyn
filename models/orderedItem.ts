import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderedItemSchema = new Schema<OrderedItem>(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    brand: { type: String },
  },
  { timestamps: true }
);

const OrderedItem =
  mongoose.models.orderedItem ||
  mongoose.model<OrderedItem>("orderedItem", orderedItemSchema);

export default OrderedItem;
