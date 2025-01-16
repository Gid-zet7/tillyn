import Category from "@/db/models/categoryModel";
import { connectDB } from "@/db/mongodb";

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params }: Params) => {
  const { id } = await params;
  await connectDB();

  const category = await Category.findById(id).lean();

  if (!category) {
    return new Response("Product not found", { status: 404 });
  }

  return new Response(JSON.stringify(category), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
