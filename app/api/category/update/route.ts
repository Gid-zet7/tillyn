import Category from "@/db/models/categoryModel";
import { connectDB } from "@/db/mongodb";

export const PATCH = async (request: Request) => {
  try {
    const { id, name, description } = await request.json();

    // Validate that the ID is provided
    if (!id) return new Response("Id is required", { status: 400 });

    await connectDB();

    // Find the category  by ID
    const category = await Category.findById(id).exec();
    if (!category) return new Response("Category not found", { status: 404 });

    // Check if the category name already exists
    if (category) {
      const duplicate: Category = await Category.findOne({ name })
        .collation({ locale: "en", strength: 2 })
        .exec();

      if (duplicate && duplicate._id.toString() !== id) {
        return new Response("Category already exists", { status: 409 });
      }
    }

    // Update the category fields only if they are provided
    if (name) category.name = name;
    if (description) category.description = description;

    // Save the updated product
    const updatedCategory = await category.save();

    return new Response(`${updatedCategory.name} updated successfully`, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
