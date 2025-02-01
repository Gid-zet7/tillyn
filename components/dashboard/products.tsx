"use client";
import React from "react";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";

import ProductCard from "@/components/products/cards/ProductCard";
import LoaderSimple from "@/components/Loader/Loader-simple/page";
import { AlertDestructive } from "../Alert/AlertDestructive";

export default function DashProducts() {
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

  if (isLoading) content = <LoaderSimple />;

  if (isError) {
    // Check if `error` is a FetchBaseQueryError and access `.data` safely
    const errorMessage =
      "data" in error && error.data
        ? (error.data as { message?: string })?.message || "An error occurred"
        : "An unknown error occurred";

    content = (
      <section className="flex flex-col items-center justify-center px-2">
        <AlertDestructive message={errorMessage} />
      </section>
    );
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
      <div className="flex flex-wrap px-8">{content}</div>
    </main>
  );
}
