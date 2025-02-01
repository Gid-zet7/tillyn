import React from "react";
import type { Metadata } from "next";
import NewProductForm from "@/components/products/forms/NewProductForm";

export const metadata: Metadata = {
  title: `Tillyn Dashboard | Add New Products - Expand Your Store Catalog`,
  description: `Easily add new products to your Tillyn store. Update your catalog with fresh items, detailed descriptions, and pricing to attract more customers and grow your business.`,
};

export default function NewProduct() {
  return (
    <div className="flex justify-center items-center w-screen">
      <NewProductForm />
    </div>
  );
}
