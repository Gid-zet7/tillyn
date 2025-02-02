import React from "react";
import type { Metadata } from "next";
import Users from "@/components/dashboard/users/Users";

export const metadata: Metadata = {
  title: `Tillyn Dashboard | Users - Manage User Accounts and Orders`,
  description: `Effortlessly manage user accounts, update order payment statuses, and oversee customer interactions on Tillyn. Streamline your operations with our intuitive dashboard tools.`,
};

export default function DashUsersPage() {
  return <Users />;
}
