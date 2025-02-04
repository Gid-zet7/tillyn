import Dashboard from "@/components/dashboard/Dashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Tillyn | Dashboard - Manage Your Account and Activities`,
  description: `Access and manage your Tillyn dashboard to track orders, update account details, and explore personalized recommendations. Take control of your shopping experience today!`,
};

export default function DashboardPage() {
  return <Dashboard />;
}
