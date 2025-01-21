"use client";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";
import { EntityId } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

import Card from "@/components/homepage/Card";

type Props = {
  productId: EntityId;
};

export default function ProductCard({ productId }: Props) {
  const { product } = useGetProductsQuery("productList", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId] as Product | undefined,
    }),
  });

  const dispatch = useDispatch();

  if (product) {
    // console.log(product);
    return (
      // <div>
      //   <Link href={`products/${product._id}`}>{product.name} </Link>
      // </div>

      <Card
        key={product._id}
        productId={product._id}
        price={product.price}
        ratings={product.ratings}
        imageSrc={product.image_url}
        title={product.name}
        stock={product.stock}
        addToCart={() => dispatch(addToCart(product))}
      />
    );
  }
}
