import CartItem from "@/db/models/cartItem";
import Cart from "@/db/models/cartModel";
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

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (request: Request, { params }: Params) => {
  const { id } = await params;
  try {
    if (!id) {
      return new Response("An Id is required", { status: 400 });
    }

    await connectDB();

    const cart = await Cart.find({ user: id }).exec();

    if (!cart.length) {
      return new Response("No cart found for this user", { status: 404 });
    }

    const cartIdToString = cart.map((cartItm) => cartItm._id.toString());

    const cartItems: CartItem[] = await CartItem.find({ cart: cartIdToString })
      .populate("cart")
      .populate("product")
      .exec();

    if (!cartItems.length) {
      return new Response("No items found for this cart", { status: 404 });
    }

    if (cartItems) {
      for (const item of cartItems) {
        const command = new GetObjectCommand({
          Bucket,
          Key: item?.product?.image_url,
        });
        const src = await getSignedUrl(s3, command, { expiresIn: 604800 });
        item.product.image_url = src;
      }
    }

    return new Response(JSON.stringify(cartItems), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in GET /api/cart-item:", error);
    return new Response("Failed to fetch cart items", { status: 500 });
  }
};
