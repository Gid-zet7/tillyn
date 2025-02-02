import React from "react";
import type { Metadata } from "next";
import DeliveredOrders from "@/components/dashboard/orders/delivered/Delivered";

export const metadata: Metadata = {
  title: `Tillyn Dashboard | Delivered Orders`,
  description: `Easily manage, edit, and update order payment status and more.`,
};

export default function DashOrdersPage() {
  return <DeliveredOrders />;
}
