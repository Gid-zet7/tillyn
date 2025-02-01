import type { Metadata } from "next";
import { MenProducts } from "@/components/products/MenProducts";

export const metadata: Metadata = {
  title: "Tillyn | Men products",
  description:
    "Explore our exclusive collection of men's products available in-store. Discover the latest trends, styles, and essentials designed for men, all in one place. Shop premium men's apparel, accessories, and more at Tillyn Clothings today!",
};

export default function MenProductsPage() {
  return (
    <section className="px-2">
      <h2 className="text-2xl font-bold mb-4">Men</h2>
      <MenProducts />
    </section>
  );
}
