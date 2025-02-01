import type { Metadata } from "next";
import { WomenProducts } from "@/components/products/WomenProducts";

export const metadata: Metadata = {
  title: "Tillyn | Women products",
  description:
    "Explore our exclusive collection of women's products available in-store. Discover the latest trends, styles, and essentials designed for women, all in one place. Shop premium women's apparel, accessories, and more at Tillyn Clothings today!",
};

export default function MenProductsPage() {
  return (
    <section className="px-2">
      <h2 className="text-2xl font-bold mb-4">Women</h2>
      <WomenProducts />
    </section>
  );
}
