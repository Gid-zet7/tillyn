import Product from "@/db/models/productModel";
import Category from "@/db/models/categoryModel";
import { connectDB } from "@/db/mongodb";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const Bucket = process.env.BUCKET_NAME;
const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.USER_ACCESS as string,
    secretAccessKey: process.env.USER_SECRET as string,
  },
});

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const categoryName = url.searchParams.get("category");
    console.log(categoryName);

    await connectDB();

    const category = await Category.findOne({ name: categoryName }).exec();

    console.log(category);

    if (!category) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Find products by category ID
    const products = await Product.find({ category: category._id })
      .populate("category")
      .lean();

    if (products) {
      for (const product of products) {
        const command = new GetObjectCommand({
          Bucket,
          Key: product.image_url,
        });
        const src = await getSignedUrl(s3, command, { expiresIn: 604800 });
        product.image_url = src;
      }
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch products", { status: 500 });
  }
};
