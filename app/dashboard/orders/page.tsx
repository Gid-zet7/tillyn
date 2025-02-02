import React from "react";
import type { Metadata } from "next";
import Orders from "@/components/dashboard/orders/Orders";

export const metadata: Metadata = {
  title: `Tillyn Dashboard | Orders`,
  description: `Easily manage, edit, and update order payment status and more.`,
};

export default function DashOrdersPage() {
  return <Orders />;
}
