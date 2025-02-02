import React from "react";
import type { Metadata } from "next";
import OrdersPending from "@/components/dashboard/orders/order-pending/OrderPending";

export const metadata: Metadata = {
  title: `Tillyn Dashboard | Orders Pending`,
  description: `Easily manage, edit, and update order payment status and more.`,
};

export default function DashOrdersPage() {
  return <OrdersPending />;
}
