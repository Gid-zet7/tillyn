import React from "react";
import EditProductForm from "@/components/products/forms/EditProductForm";

type Params = {
  params: {
    productId: string;
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
