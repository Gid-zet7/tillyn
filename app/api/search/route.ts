import { connectDB } from "@/db/mongodb";
import Product from "@/db/models/productModel";
import Category from "@/db/models/categoryModel"; // Import category model
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const Bucket = process.env.BUCKET_NAME;
const USER_ACCESS = process.env.USER_ACCESS;
const USER_SECRET = process.env.USER_SECRET;
const BUCKET_REGION = process.env.BUCKET_REGION;

// Ensure environment variables are properly loaded
if (!Bucket || !USER_ACCESS || !USER_SECRET || !BUCKET_REGION) {
  throw new Error("Missing AWS S3 environment variables.");
}

const s3 = new S3Client({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: USER_ACCESS,
    secretAccessKey: USER_SECRET,
  },
});

export const GET = async (request: Request) => {
  try {
    await connectDB();

    const url = new URL(request.url);
    const query = url.searchParams.get("query") || ""; // Ensure query is a string
    const regex = new RegExp(query, "i");

    // Find products by name or description
    let products = await Product.find({
      $or: [{ name: { $regex: regex } }, { description: { $regex: regex } }],
    }).lean(); // Use `.lean()` to return plain JavaScript objects

    // If no products found by name/description, search by category
    if (products.length === 0) {
      const matchingCategories = await Category.find({
        name: { $regex: regex },
      }).lean();
      const categoryIds = matchingCategories.map((cat) => cat._id);

      products = await Product.find({ category: { $in: categoryIds } }).lean();
    }

    // If still no products found, return 404
    if (products.length === 0) {
      return new Response("No product found", { status: 404 });
    }

    // Generate signed URLs for product images
    await Promise.all(
      products.map(async (product) => {
        if (product.image_url) {
          const command = new GetObjectCommand({
            Bucket,
            Key: product.image_url,
          });
          product.image_url = await getSignedUrl(s3, command, {
            expiresIn: 604800,
          });
        }
      })
    );

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    // console.error("Error fetching products:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
};
