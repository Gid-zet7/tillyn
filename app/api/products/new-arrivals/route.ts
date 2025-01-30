import Product from "@/db/models/productModel";
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
    const newArrivals = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(10);

    if (newArrivals?.length === 0) {
      return new Response("No products found", { status: 404 });
    }

    if (newArrivals) {
      for (const product of newArrivals) {
        const command = new GetObjectCommand({
          Bucket,
          Key: product.image_url,
        });
        const src = await getSignedUrl(s3, command, { expiresIn: 604800 });
        product.image_url = src;
      }
    }

    return new Response(JSON.stringify(newArrivals), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return new Response("Failed to fetch new arrivals", { status: 500 });
  }
};
