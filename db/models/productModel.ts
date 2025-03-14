import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    image_url: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    ratings: { type: Number, required: true },
    size: { type: String, required: true },
    brand: { type: String },
    stock: { type: Number, required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.product || mongoose.model<Product>("product", productSchema);

export default Product;
