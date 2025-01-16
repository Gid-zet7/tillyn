import Product from "@/db/models/productModel";
import Category from "@/db/models/categoryModel";
import { connectDB } from "@/db/mongodb";

export const GET = async () => {
  try {
    await connectDB();

    // Find the category ID for "women"
    const category: Category | null = await Category.findOne({
      name: "Men",
    }).exec();
    if (!category) {
      return new Response("Category not found", { status: 404 });
    }

    // Fetch products associated with the "women" category
    const products = await Product.find({ category: category._id })
      .populate("category")
      .lean();

    if (products.length === 0) {
      return new Response("No products found for this category", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // console.log(error);
    return new Response("Failed to fetch products", { status: 500 });
  }
};
