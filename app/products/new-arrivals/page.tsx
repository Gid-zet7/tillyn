import type { Metadata } from "next";
import { NewArrivals } from "@/components/products/NewArrivals";

export const metadata: Metadata = {
  title: "Tillyn | New arrivals",
  description:
    "Discover our latest arrivals! This page showcases all the newly added products in our store. Stay ahead of the trend with our fresh collection of stylish and innovative items. Shop now to explore what's new and elevate your shopping experience at Tillyn Clothings!",
};

export default function NewArrivalsPage() {
  return (
    <section className="px-2">
      <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
      <NewArrivals />
    </section>
  );
}
