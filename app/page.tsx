import React from "react";
import type { Metadata } from "next";
import Home from "@/components/homepage/Home/Home";

export const metadata: Metadata = {
  title: `Tillyn | Ghana's #1 Online Clothing Store`,
  description: `Welcome to Tillyn, Ghana's leading online clothing store! Explore the latest fashion trends, stylish apparel, and exclusive collections for men, women, and kids. Shop now for premium quality and unbeatable style.`,
};

export default function HomePage() {
  return <Home />;
}
