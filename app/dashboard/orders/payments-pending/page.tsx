import React from "react";
import type { Metadata } from "next";
import PaymentPending from "@/components/dashboard/orders/payment-pending/PaymentPending";

export const metadata: Metadata = {
  title: `Tillyn Dashboard | Payments Pending`,
  description: `Easily manage, edit, and update order payment status and more.`,
};

export default function PaidPage() {
  return <PaymentPending />;
}
