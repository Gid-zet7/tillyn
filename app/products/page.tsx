"use client";
import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";

import ProductCard from "@/components/products/cards/ProductCard";
import Loader from "@/components/Loader/page";
import Snackbar from "@/components/Snackbar/Snackbar";
import { Button } from "@/components/ui/button";

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

  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  // const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  useEffect(() => {
    if (error) {
      setShowErrorSnackbar(true);
      const timer = setTimeout(() => {
        setShowErrorSnackbar(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setShowSuccessSnackbar(true);
  //     const timer = setTimeout(() => {
  //       setShowSuccessSnackbar(false);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [isSuccess]);

  let content;

  if (isLoading)
    content = (
      <div>
        <Loader message="Fetching products..." />
      </div>
    );

  if (isError) {
    setShowErrorSnackbar(true);
    content = showErrorSnackbar && <Snackbar message={error.data} />;
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
      <section className="lg:flex lg:flex-col  w-screen">
        <div className="px-5">
          <div className="relative p-4 md:p-8 border rounded-md">
            <div className=" flex gap-3">
              <Button className="mb-6">Best Deals</Button>
              <Button className="mb-6">Thrift</Button>
            </div>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-4 p-3 md:p-6">
              {content}
            </div>
          </div>
        </div>
      </section>
      {/* <div className="flex">{content}</div> */}
    </main>
  );
}
