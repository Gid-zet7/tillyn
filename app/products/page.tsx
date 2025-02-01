import React from "react";
import type { Metadata } from "next";
import ProductsPage from "@/components/products/Products";

export const metadata: Metadata = {
  title: `Tillyn | Products - Explore Our Latest Collection`,
  description: `Discover a wide range of high-quality products at Tillyn. Browse our latest collection of fashion, accessories, and more. Shop now for exclusive deals and styles!`,
};

export default function Products() {
  return <ProductsPage />;
}
