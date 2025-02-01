import React from "react";
import type { Metadata } from "next";
import ProductsPage from "@/components/products/Products";

export const metadata: Metadata = {
  title: "Tillyn | Products",
  description: "This page displays all the products currently in our store",
};

export default function Products() {
  return <ProductsPage />;
}
