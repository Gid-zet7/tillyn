import type { Metadata } from "next";
import Product from "@/components/products/cards/Product";
import { getProductById } from "@/lib/actions";

type Params = {
  params: {
    productId: string;
  };
};

export const generateMetadata = async ({
  params,
}: Params): Promise<Metadata> => {
  const { productId } = await params;
  const productData: Promise<Product> = getProductById(productId);
  const product: Product = await productData;

  if (!product?.name) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: `Tillyn | ${product?.name} details`,
    description: `Discover everything about ${product?.name} at Tillyn Clothings. Learn about its features, specifications, and benefits. Shop now for the best deals on ${product?.name}!`,
  };
};

export default async function ProductPage({ params }: Params) {
  const { productId } = await params;

  return <Product productId={productId} />;
}
