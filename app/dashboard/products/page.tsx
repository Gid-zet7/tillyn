import React from "react";
import type { Metadata } from "next";
import DashProducts from "@/components/dashboard/products";

export const metadata: Metadata = {
  title: `Tillyn Dashboard | Products - Manage Your Product Listings`,
  description: `Easily manage, edit, and update your product listings on Tillyn. Streamline your inventory and keep your store up-to-date with our intuitive dashboard tools.`,
};

export default function DashProductsPage() {
  return <DashProducts />;
}
