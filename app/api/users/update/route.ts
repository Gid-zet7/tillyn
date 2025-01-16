import UserModel from "@/db/models/userModel";
import { connectDB } from "@/db/mongodb";

export const PATCH = async (request: Request) => {
  try {
    const { preferred_email, phone_number, address } = await request.json();

    console.log(preferred_email, phone_number, address);

    // Validate that the ID is provided

    await connectDB();

    // Find the user by ID
    const user = await UserModel.findOne({ email: preferred_email }).exec();
    if (!user) return new Response("User not found", { status: 404 });

    // Update the user fields only if they are provided
    if (preferred_email) user.email = preferred_email;
    if (phone_number) user.phone_number = phone_number;
    if (address) user.address = address;

    // Save the updated user
    const updatedUser = await user.save();

    return new Response(`${updatedUser.username} updated successfully`, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
