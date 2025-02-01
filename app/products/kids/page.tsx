import type { Metadata } from "next";
import { KidProducts } from "@/components/products/KidsProducts";

export const metadata: Metadata = {
  title: "Tillyn | Kids products",
  description:
    "Browse our wide selection of kids' products! This page features everything we currently offer for children, from clothing and accessories to essentials. Find the perfect items for your little ones and shop the best in kids' products at Tillyn Clothings today!",
};

export default function MenProductsPage() {
  return (
    <section className="px-2">
      <h2 className="text-2xl font-bold mb-4">Kids</h2>
      <KidProducts />
    </section>
  );
}
