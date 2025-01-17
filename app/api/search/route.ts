import { connectDB } from "@/db/mongodb";
import Product from "@/db/models/productModel";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const searchQuery = query ? String(query) : "";

    const regex = new RegExp(searchQuery, "i");
    await connectDB();

    // Try to find products by name or description
    let products = await Product.find({
      $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
    });

    // If no products found, try to find by category
    if (products.length === 0) {
      products = await Product.find({})
        .populate({
          path: "category",
          match: { name: { $regex: regex } }, // Apply regex to category name
        })
        .then((results) => {
          // Filter out products where the category doesn't match
          return results.filter((product) => product.category !== null);
        });
    }

    // Return response based on products found
    if (products.length === 0) {
      return new Response("No product found", { status: 404 });
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch products", { status: 500 });
  }
};
