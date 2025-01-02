import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userShema = new Schema<User>(
  {
    username: { type: String, required: true, minlength: 3 },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    brand: { type: String, required: false },
    address: {
      address_line1: { type: String, required: true },
      address_line2: String,
      city: { type: String, required: true },
      postal_code: String,
    },
    subscription: {
      plan: { type: String, required: false },
      status: {
        type: String,
        enum: ["active", "inactive", "canceled", "trial"],
      },
      startDate: { type: Date, default: Date.now() },
      endDate: { type: Date },
      paymentId: { type: String },
      isTrial: { type: Boolean, default: false },
    },
    roles: { type: [String], default: ["User"] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.user || mongoose.model<User>("user", userShema);

export default UserModel;
