"use client";
import ProductCard from "@/components/products/cards/ProductCard";
import { useGetProductByCategoryQuery } from "@/redux/slices/productsApiSlice";

export default function MenProductsPage() {
  const {
    data: menProducts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductByCategoryQuery("Men");

  let content;
  if (isLoading)
    content = (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  if (isError) {
    console.log(error.data);
    content = <h1>Uh oh.. something went wrong</h1>;
  }

  if (isSuccess) {
    const { ids } = menProducts;
    content =
      ids?.length &&
      ids?.map((productId, index) => (
        <ProductCard key={index} productId={productId} />
      ));
  }
  return (
    <main>
      <div className="flex">{content}</div>
    </main>
  );
}
