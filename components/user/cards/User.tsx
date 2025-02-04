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
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const [errorOrder, setErrorOrder] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setErrorUser(null);

      try {
        const userData = await getUserData(email);
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setErrorUser("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  useEffect(() => {
    if (!user) return;

    const fetchUserOrders = async () => {
      setLoading(true);
      setErrorOrder(null);

      try {
        const ordersData = await getUserOrder(email);
        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setErrorOrder("No orders yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user, email]);

  if (loading) {
    return <LoaderSimple />;
  }

  if (errorUser) {
    return <div className="text-red-500">{errorUser}</div>;
  }

  if (!user) {
    return <h1>{errorUser}</h1>;
  }

  return (
    <div>
      <UserProfile user={user} orders={orders} errorOrder={errorOrder} />
    </div>
  );
}
