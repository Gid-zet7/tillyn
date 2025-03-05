"use client";
import React, { useState, useEffect } from "react";
import { useUpdateOrderMutation } from "@/redux/slices/orderApiSlice";
import {
  getAllOrders,
  getOrder,
  getOrderItems,
  getProduct,
} from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderCard from "./card/OrderCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface OrderWithItems extends Order {
  items?: {
    product: any;
    quantity: number;
  }[];
}

export default function Orders() {
  const { getPermission, getUser } = useKindeBrowserClient();
  const [updateOrder] = useUpdateOrderMutation();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshOrders, setRefreshOrders] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderEditModal, setOrderEditModal] = useState(false);
  const [orderID, setOrderID] = useState<string>("");
  const [payment_status, setPaymentStatus] = useState<string>("");
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderedItems, setOrderedItems] = useState<{ product: any }[]>();
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<OrderWithItems[]>([]);

  const isRetailer = getPermission("retailer")?.isGranted;
  const user = getUser();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await getAllOrders();

        if (isRetailer && user) {
          // For retailers, fetch all order items and their products
          const ordersWithItems = await Promise.all(
            data.map(async (order: Order) => {
              const items = await getOrderItems(order._id);
              const itemsWithProducts = await Promise.all(
                items.map(async (item: any) => {
                  const product = await getProduct(item.product);
                  return {
                    ...item,
                    product,
                  };
                })
              );
              return {
                ...order,
                items: itemsWithProducts,
              };
            })
          );

          // Filter orders that have at least one product from the current seller
          const filteredOrders = ordersWithItems.filter((order) => {
            const sellerItems = order.items?.filter(
              (item: OrderedItem) => item.product.seller?.email === user.email
            );
            return sellerItems && sellerItems.length > 0;
          });

          // Sort orders by date (newest first)
          const sortedOrders = filteredOrders.sort(
            (a, b) =>
              new Date(b.order_date).getTime() -
              new Date(a.order_date).getTime()
          );

          setOrders(sortedOrders);
        } else {
          // For admin, show all orders sorted by date
          const sortedOrders = data.sort(
            (a: any, b: any) =>
              new Date(b.order_date).getTime() -
              new Date(a.order_date).getTime()
          );
          setOrders(sortedOrders);
        }
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error("Error fetching data:", err);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [refreshOrders, isRetailer, user]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = orders.filter(
      (order) =>
        order.user.first_name.toLowerCase().includes(query) ||
        order.user.last_name.toLowerCase().includes(query) ||
        order.user.email.toLowerCase().includes(query) ||
        order._id.toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  }, [orders, searchQuery]);

  const toggleEdit = async (id: string | null) => {
    if (typeof id === "string") {
      try {
        const result: Order = await getOrder(id);
        setOrderID(result._id);
        setPaymentStatus(result?.payment_status);
        setOrderStatus(result?.status);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    }
    setOrderEditModal((prevState) => !prevState);
  };

  const toggleViewOrderItems = async (orderId: string | null) => {
    if (typeof orderId === "string") {
      try {
        setIsLoading(true);
        // If we're a retailer, filter items to only show our products
        const order = orders.find((o) => o._id === orderId);
        if (order?.items && isRetailer) {
          const sellerItems = order.items.filter(
            (item) => item.product.seller?.email === user?.email
          );
          setOrderedItems(sellerItems);
        } else {
          // For admin or if items aren't cached, fetch all items
          const result: OrderedItem[] = await getOrderItems(orderId);
          const productsWithDetails = await Promise.all(
            result.map(async (item: any) => {
              const product = await getProduct(item.product);
              return {
                orderItemQuantity: item.quantity,
                product: product,
              };
            })
          );
          setOrderedItems(productsWithDetails);
        }
        setExpandedCardId(expandedCardId === orderId ? null : orderId);
      } catch (error) {
        console.error("Error fetching order items:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdateOnClick = async () => {
    try {
      const orderDetails = { id: orderID, status: orderStatus, payment_status };
      await updateOrder(orderDetails).unwrap();
      setRefreshOrders((prev) => !prev);
      toggleEdit(null);
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  if (isLoading && orders.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {isRetailer ? "Your Orders" : "All Orders"}
        </h1>
        <p className="text-gray-600">
          {isRetailer
            ? "View and manage orders containing your products"
            : "Manage all orders in the system"}
        </p>
      </div>

      {orderEditModal && (
        <div>
          <Card className="flex flex-col justify-between fixed top-1/2 left-1/2 p-10 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="mb-4">
              <label
                htmlFor="payment_status"
                className="block font-semibold mb-2"
              >
                Payment Status
              </label>
              <Select value={payment_status} onValueChange={setPaymentStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Update payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Payment Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="order_status"
                className="block font-semibold mb-2"
              >
                Order Status
              </label>
              <Select value={orderStatus} onValueChange={setOrderStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Update Order status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Order Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleUpdateOnClick}>Update</Button>
          </Card>
          <div onClick={() => toggleEdit(null)} className="overlay"></div>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <Input
          type="text"
          placeholder="Search by name, email, or order ID..."
          className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-2 border rounded "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        /* Order Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                id={order._id}
                user={order.user}
                order={order}
                toggleEdit={() => toggleEdit(order._id)}
                viewOrderItems={expandedCardId === order._id}
                toggleViewOrderItems={() => toggleViewOrderItems(order._id)}
                orderedItems={orderedItems}
                isLoading={isLoading}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No matching orders found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
