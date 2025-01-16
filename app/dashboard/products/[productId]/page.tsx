import React from "react";
import Product from "@/components/products/cards/Product";

type Params = {
  params: {
    productId: string;
  };
};

export default async function ProductPage({ params }: Params) {
  const { productId } = await params;
  // console.log(productId);

  return <Product productId={productId} />;
}
