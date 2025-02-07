import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sellerReviewSchema = new Schema<SellerReview>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SellerReview =
  mongoose.models.SellerReview ||
  mongoose.model("SellerReview", sellerReviewSchema);

export default SellerReview;
