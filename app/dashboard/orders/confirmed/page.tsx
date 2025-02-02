import React from "react";
import type { Metadata } from "next";
import ConfirmedOrders from "@/components/dashboard/orders/confirmed/Confirmed";

export const metadata: Metadata = {
  title: `Tillyn Dashboard | Confirmed Orders`,
  description: `Easily manage, edit, and update order payment status and more.`,
};

export default function DashOrdersPage() {
  return <ConfirmedOrders />;
}
