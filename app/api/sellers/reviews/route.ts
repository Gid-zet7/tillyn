import { NextResponse } from "next/server";
import { connectDB } from "@/db/mongodb";
import SellerReview from "@/db/models/sellerReviewModel";
import UserModel from "@/db/models/userModel";

export async function GET(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const sellerId = url.searchParams.get("sellerId");

    if (!sellerId) {
      return NextResponse.json(
        { success: false, error: "Seller ID is required" },
        { status: 400 }
      );
    }
    const users = await UserModel.find().exec();
    const reviews = await SellerReview.find({ seller: sellerId })
      .populate("user", "first_name last_name picture")
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(reviews), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response("Failed to fetch reviews", { status: 500 });
  }
}
