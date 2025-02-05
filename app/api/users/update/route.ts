import UserModel from "@/db/models/userModel";
import { connectDB } from "@/db/mongodb";

export const PATCH = async (request: Request) => {
  try {
    const { preferred_email, phone_number, address } = await request.json();

    await connectDB();

    // Find the user by ID
    const user = await UserModel.findOne({ email: preferred_email }).exec();
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update the user fields only if they are provided
    if (preferred_email) user.email = preferred_email;
    if (phone_number) user.phone_number = phone_number;
    if (address) user.address = address;

    // Save the updated user
    const updatedUser = await user.save();

    // Return the updated user in JSON format
    return new Response(
      JSON.stringify({
        message: `${updatedUser.first_name} updated successfully`,
        user: updatedUser,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch {
    // console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
