import React from "react";
import type { Metadata } from "next";
import Home from "@/components/homepage/Home/Home";

export const metadata: Metadata = {
  title: "Tillyn | Home",
  description: "This is Ghana's number one clothing online store home page",
};

export default function HomePage() {
  return <Home />;
}
