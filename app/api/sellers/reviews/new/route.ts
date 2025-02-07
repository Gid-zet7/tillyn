import { connectDB } from "@/db/mongodb";
import SellerReview from "@/db/models/sellerReviewModel";
import UserModel from "@/db/models/userModel";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { sellerId, email, rating, comment } = await req.json();

    const findUser = await UserModel.findOne({ email: email }).exec();

    if (!findUser)
      return new Response("Login to place an order", { status: 400 });

    const review = await SellerReview.create({
      seller: sellerId,
      user: findUser._id,
      rating,
      comment,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify(review), {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return new Response("Failed to create review", { status: 500 });
  }
}
