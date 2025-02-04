import Product from "@/db/models/productModel";
import Category from "@/db/models/categoryModel";
import { connectDB } from "@/db/mongodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Users, init } from "@kinde/management-api-js";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserModel from "@/db/models/userModel";

const Bucket = process.env.BUCKET_NAME;
const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.USER_ACCESS as string,
    secretAccessKey: process.env.USER_SECRET as string,
  },
});

init();

export const POST = async (request: Request) => {
  try {
    const session = await getKindeServerSession().getUser();
    const user = await Users.getUserData({ id: session.id });

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const findUser = await UserModel.findOne({ email: user.preferred_email });

    if (!findUser) return new Response("Unauthorized", { status: 401 });

    const formData = await request.formData();

    // Get form fields
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const ratings = parseFloat(formData.get("ratings") as string);
    const size = formData.get("size") as string;
    const brand = formData.get("brand") as string;
    const stock = parseInt(formData.get("stock") as string);
    const category = formData.get("category") as string;
    const files = formData.getAll("image") as File[];

    // Validate required fields
    if (
      !name ||
      !description ||
      !price ||
      !ratings ||
      !stock ||
      !category ||
      files.length === 0
    ) {
      return new Response(
        "All fields are required, including at least one image",
        { status: 400 }
      );
    }

    const fileMappings: { [key: string]: string } = {
      jpeg: "image/jpeg",
      png: "image/png",
      jpg: "image/jpg",
      svg: "image/svg",
      gif: "image/gif",
      pdf: "application/pdf",
    };

    await Promise.all(
      files.map(async (file) => {
        const Body = Buffer.from(await file.arrayBuffer()) as Buffer;
        const fileName = file.name;
        const fileExtension = file.name.split(".").pop() as string;
        const contentType =
          fileMappings[fileExtension] || "application/octet-stream"; // Fallback to binary if unknown

        const putObjectParams = {
          Bucket,
          Key: fileName,
          Body,
          ContentType: contentType, // Set content type dynamically
        };

        await s3.send(new PutObjectCommand(putObjectParams));
      })
    );

    await connectDB();

    // Check if the product has been already created
    const productExists = await Product.findOne({ name })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (productExists) {
      return new Response("Product with the same name already created", {
        status: 409,
      });
    }

    // Find the category by name
    const findCategory = await Category.findOne({ name: category }).exec();

    if (!findCategory) {
      return new Response("Category not found", { status: 404 });
    }

    const imageUrl = files.map((file) => {
      return file.name;
    });

    const productObj = {
      name,
      description,
      price,
      ratings,
      size,
      brand,
      stock,
      category: findCategory,
      image_url: imageUrl[0],
      seller: findUser._id,
    };

    const product = await Product.create(productObj);

    if (product) {
      return new Response("New product added successfully", { status: 200 });
    }
  } catch {
    // console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
