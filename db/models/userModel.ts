import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userShema = new Schema<User>(
  {
    email: { type: String, required: true },
    picture: { type: String, required: false },
    last_name: { type: String, required: true },
    first_name: { type: String, required: true },
    is_suspended: { type: String, required: false, default: false },
    phone_number: { type: String, required: false },
    address: {
      address_line1: { type: String, required: false },
      address_line2: String,
      city: { type: String, required: false },
      postal_code: String,
      // coordinates: {
      //   latitude: Number,
      //   longitude: Number,

      // },
    },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.user || mongoose.model<User>("user", userShema);

export default UserModel;
