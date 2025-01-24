"use client";

import React, { useEffect, useState } from "react";
import { getUserData, getUserOrder } from "@/lib/actions";
import UserProfile from "./UserProfile";
import LoaderSimple from "@/components/Loader/Loader-simple/page";

type Props = {
  email: string;
};

export default function User({ email }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch user and orders data concurrently
        const [userData, ordersData] = await Promise.all([
          getUserData(email),
          getUserOrder(email),
        ]);
        setUser(userData);
        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching user or orders data:", err);
        setError("Failed to load user data or orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  if (loading) {
    return <LoaderSimple />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <div>
      <UserProfile user={user} orders={orders} />
    </div>
  );
}
