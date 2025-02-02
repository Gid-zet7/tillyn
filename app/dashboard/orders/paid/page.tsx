import React from "react";
import type { Metadata } from "next";
import PaidOrders from "@/components/dashboard/orders/paid/Paid";

export const metadata: Metadata = {
  title: `Tillyn Dashboard | Paid Orders`,
  description: `Easily manage, edit, and update order payment status and more.`,
};

export default function PaidPage() {
  return <PaidOrders />;
}
