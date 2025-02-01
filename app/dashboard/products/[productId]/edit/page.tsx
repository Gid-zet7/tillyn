import React from "react";
import type { Metadata } from "next";
import { getProductById } from "@/lib/actions";
import EditProductForm from "@/components/products/forms/EditProductForm";

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
    title: `Tillyn Dashboard | Edit ${product?.name} - Update Product Details`,
    description: `Easily update and manage ${product?.name} details on Tillyn. Edit product information, pricing, and descriptions to keep your listings accurate and up-to-date.`,
  };
};

export default async function EditProductPage({ params }: Params) {
  const { productId } = await params;
  return (
    <div className="flex justify-center items-center w-screen">
      <EditProductForm productId={productId} />;
    </div>
  );
}
