"use client";
import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";
import ProductCard from "@/components/products/cards/ProductCard";
import { AlertDestructive } from "../Alert/AlertDestructive";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import DashProductsSkeleton from "../skeleton/DashProductsSkeleton";

export default function DashProducts() {
  const { getPermission, getUser } = useKindeBrowserClient();
  const [filteredIds, setFilteredIds] = useState<string[]>([]);

  const isRetailer = getPermission("retailer")?.isGranted;
  const user = getUser();

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

  useEffect(() => {
    if (isSuccess && products?.ids && user) {
      if (isRetailer) {
        // Filter products to only show those belonging to the current retailer
        const filteredProducts = products.ids.filter((id) => {
          const product = products.entities[id];

          return product?.seller?.email === user?.email;
        });
        console.log(filteredProducts);
        setFilteredIds(filteredProducts);
      } else {
        // For admin, show all products
        setFilteredIds(products.ids);
      }
    }
  }, [isSuccess, products, user]);

  let content;

  if (isLoading) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <DashProductsSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
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
    if (filteredIds.length === 0) {
      content = (
        <section className="flex flex-col items-center justify-center px-2">
          <p className="text-gray-500">
            No products found. Start by adding a new product.
          </p>
        </section>
      );
    } else {
      content = (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredIds.map((productId) => (
            <ProductCard key={productId} productId={productId} />
          ))}
        </div>
      );
    }
  }

  return (
    <main className="p-8">
      <div className="mb-6">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Your Products</h1>
            <p className="text-gray-600">
              Manage and update your product listings
            </p>
          </>
        )}
      </div>
      {content}
    </main>
  );
}
