"use client";
import React from "react";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";

import ProductCard from "@/components/products/cards/ProductCard";

export default function ProductsPage() {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery(undefined, {
    pollingInterval: 68000,
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  let content;

  if (isLoading)
    content = (
      <div>
        <h2>Loading...</h2>
      </div>
    );

  if (isError) {
    console.log(error.data);
    content = <p>{error.data}</p>;
  }

  if (isSuccess) {
    const { ids } = products;

    content =
      ids?.length &&
      ids?.map((productId) => (
        <ProductCard key={productId} productId={productId} />
      ));
  }
  return (
    <main>
      <div className="flex">{content}</div>
    </main>
  );
}
