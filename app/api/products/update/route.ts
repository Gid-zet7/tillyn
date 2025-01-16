import Product from "@/db/models/productModel";
import Category from "@/db/models/categoryModel";
import { connectDB } from "@/db/mongodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const Bucket = process.env.BUCKET_NAME;
const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.USER_ACCESS as string,
    secretAccessKey: process.env.USER_SECRET as string,
  },
});

export const PATCH = async (request: Request) => {
  try {
    const formData = await request.formData();

    // Get form fields
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const ratings = parseFloat(formData.get("ratings") as string);
    const size = formData.get("size") as string;
    const brand = formData.get("brand") as string;
    const stock = parseInt(formData.get("stock") as string);
    const category = formData.get("category") as string;
    const files = formData.getAll("image") as File[];

    // Validate that the ID is provided
    if (!id) return new Response("Id is required", { status: 400 });

    if (
      !name ||
      !description ||
      !price ||
      !ratings ||
      // !stock ||
      !size ||
      !brand ||
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
      files?.map(async (file) => {
        const Body = Buffer.from(await file.arrayBuffer()) as Buffer;
        const fileName = file.name;
        const fileExtension = file.name.split(".").pop() as string;
        const contentType =
          fileMappings[fileExtension] || "application/octet-stream";

        const putObjectParams = {
          Bucket,
          Key: fileName,
          Body,
          ContentType: contentType,
        };

        await s3.send(new PutObjectCommand(putObjectParams));
      })
    );

    await connectDB();

    // Find the product  by ID
    const product = await Product.findById(id).exec();
    if (!product) return new Response("Product not found", { status: 404 });

    // Check if the product name already exists
    if (product) {
      const duplicate: Product = await Product.findOne({ name })
        .collation({ locale: "en", strength: 2 })
        .exec();

      if (duplicate && duplicate._id.toString() !== id) {
        return new Response("Product already exists", { status: 409 });
      }
    }

    const findCategory = await Category.findOne({ name: category })
      .lean()
      .exec();

    if (!findCategory) {
      return new Response("Invalid category", { status: 400 });
    }

    const imageUrl = files?.map((file) => {
      return file.name;
    });

    // Update the product fields only if they are provided
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (ratings) product.ratings = ratings;
    if (size) product.size = size;
    if (brand) product.brand = brand;
    if (stock === 0) product.stock = 0;
    if (stock) product.stock = stock;
    if (category) product.category = findCategory;
    if (imageUrl) product.image_url = imageUrl[0];

    // Save the updated product
    const updatedProduct = await product.save();

    return new Response(`${updatedProduct.name} updated successfully`, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
