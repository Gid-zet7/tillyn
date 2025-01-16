import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema<Product>(
  {
    name: { type: String, require: true },
    image_url: { type: String, required: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    ratings: { type: Number, require: true },
    size: { type: String, require: true },
    brand: { type: String },
    stock: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.product || mongoose.model<Product>("product", productSchema);

export default Product;
