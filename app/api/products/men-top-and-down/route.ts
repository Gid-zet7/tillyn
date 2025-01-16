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

export const GET = async () => {
  try {
    await connectDB();

    // Find the category ID for "women"
    const category: Category | null = await Category.findOne({
      name: "Premium Men Top and Down Set",
    }).exec();
    if (!category) {
      return new Response("Category not found", { status: 404 });
    }

    // Fetch products associated with the "women" category
    const products = await Product.find({ category: category._id })
      .populate("category")
      .lean();

    if (products?.length === 0) {
      return new Response("No products found for this category", {
        status: 404,
      });
    }

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
    // console.log(error);
    return new Response("Failed to fetch products", { status: 500 });
  }
};
