import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema<Category>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.category ||
  mongoose.model<Category>("category", categorySchema);

export default Category;
