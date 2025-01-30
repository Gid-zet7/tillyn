import Category from "@/db/models/categoryModel";
import { connectDB } from "@/db/mongodb";

export const GET = async () => {
  try {
    await connectDB();

    const categories = await Category.find().lean();

    if (categories.length === 0) {
      return new Response("No categories posted yet", { status: 404 });
    }

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    // console.log(error);
    return new Response("Failed to fetch categories", { status: 500 });
  }
};
