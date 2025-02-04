import Product from "@/db/models/productModel";
// import Category from "@/db/models/categoryModel";
import { connectDB } from "@/db/mongodb";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

type Params = {
  params: {
    id: string;
  };
};

const Bucket = process.env.BUCKET_NAME;
const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.USER_ACCESS as string,
    secretAccessKey: process.env.USER_SECRET as string,
  },
});

export const GET = async (request: Request, { params }: Params) => {
  const { id } = await params;
  try {
    await connectDB();
    // const category = Category.find().lean();
    const product: Product | null = await Product.findById(id)
      .populate("category")
      .populate("seller")
      .exec();

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }
    const command = new GetObjectCommand({ Bucket, Key: product.image_url });
    const src = await getSignedUrl(s3, command, { expiresIn: 604800 });
    product.image_url = src;

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    // console.log(error);
    return new Response("Failed to fetch product", { status: 500 });
  }
};
