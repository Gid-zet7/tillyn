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

export const PATCH = async (request: Request) => {
  try {
    await connectDB();

    const session = await getKindeServerSession().getUser();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const user = await Users.getUserData({ id: session.id });
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const findUser = await UserModel.findOne({ email: user.preferred_email });
    if (!findUser) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    console.log(findUser);

    const formData = await request.formData();

    // Validate form fields
    const id = formData.get("id")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const ratings = parseFloat(formData.get("ratings")?.toString() || "0");
    const size = formData.get("size")?.toString() || "";
    const brand = formData.get("brand")?.toString() || "";
    const stock = parseInt(formData.get("stock")?.toString() || "0");
    const category = formData.get("category")?.toString() || "";
    const files = formData.getAll("image") as File[];

    if (
      !id ||
      !name ||
      !description ||
      price <= 0 ||
      ratings < 0 ||
      !size ||
      !brand ||
      !category
    ) {
      return new Response(
        JSON.stringify({ error: "some fields are missing" }),
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    // Check for duplicate product name
    const duplicate = await Product.findOne({ name }).collation({
      locale: "en",
      strength: 2,
    });
    if (duplicate && duplicate._id.toString() !== id) {
      return new Response(JSON.stringify({ error: "Product already exists" }), {
        status: 409,
      });
    }

    // Find the category
    const findCategory = await Category.findOne({ name: category }).lean();
    if (!findCategory) {
      return new Response(JSON.stringify({ error: "Invalid category" }), {
        status: 400,
      });
    }

    // Upload images to S3 only if new image is provided
    let imageUrl = product.image_url;
    if (files && files.length > 0) {
      const imageUrls: string[] = [];
      await Promise.all(
        files.map(async (file) => {
          const Body = Buffer.from(await file.arrayBuffer());
          const fileName = `${Date.now()}-${file.name}`;

          await s3.send(
            new PutObjectCommand({
              Bucket,
              Key: fileName,
              Body,
              ContentType: file.type || "application/octet-stream",
            })
          );

          imageUrls.push(fileName);
        })
      );
      imageUrl = imageUrls[0]; // Update image URL only if new image was uploaded
    }

    // Update the product
    product.name = name;
    product.description = description;
    product.price = price;
    product.ratings = ratings;
    product.size = size;
    product.brand = brand;
    product.stock = stock;
    product.category = findCategory;
    product.image_url = imageUrl;
    product.seller = findUser._id;

    await product.save();
    console.log(product);

    return new Response(
      JSON.stringify({ message: `${product.name} updated successfully` }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
