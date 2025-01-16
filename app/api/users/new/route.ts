import UserModel from "@/db/models/userModel";
import { connectDB } from "@/db/mongodb";

export const POST = async (request: Request) => {
  try {
    const userData = await request.json();
    console.log(userData);

    const {
      preferred_email,
      picture,
      last_name,
      first_name,
      is_suspended,
      phone_number,
      address,
    } = userData;

    // Validate required fields
    if (!preferred_email || !last_name || !first_name) {
      return new Response(
        `Missing required fields for user: ${JSON.stringify(userData)}`,
        { status: 400 }
      );
    }

    await connectDB();

    const emailExists = await UserModel.findOne({ email: preferred_email })
      .lean()
      .exec();

    if (!emailExists) {
      // Create user object
      const userObj = {
        email: preferred_email,
        picture,
        last_name,
        first_name,
        is_suspended,
        phone_number,
        address,
      };

      // Save the user to the database
      const user = await UserModel.create(userObj);

      return new Response(
        JSON.stringify({
          message: `User added successfully.`,
          user,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: `User already exists.`,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
