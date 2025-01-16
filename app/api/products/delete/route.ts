import Product from "@/db/models/productModel";
import { connectDB } from "@/db/mongodb";

export const DELETE = async (request: Request) => {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response("An Id is required", { status: 400 });
    }

    await connectDB();

    const product = await Product.findById(id).exec();

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    await product.deleteOne();

    return new Response(`Product with id ${id} deleted successfully`, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
