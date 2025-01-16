import Category from "@/db/models/categoryModel";
import { connectDB } from "@/db/mongodb";

export const POST = async (request: Request) => {
  try {
    const { name, description } = await request.json();

    if (!name || !description) {
      return new Response("All fields are required", { status: 400 });
    }

    await connectDB();

    // Check if the category has been already created
    const categoryExists = await Category.findOne({ name })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (categoryExists) {
      return new Response("Category already created", { status: 409 });
    }

    const categoryObj = {
      name,
      description,
    };

    const category = await Category.create(categoryObj);

    if (category) {
      return new Response("New category added successfully", { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
