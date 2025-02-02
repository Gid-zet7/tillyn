"use client";
import React, { useState, useEffect } from "react";
import { useUpdateOrderMutation } from "@/redux/slices/orderApiSlice";
import {
  getOrderDelivered,
  getOrder,
  getOrderItems,
  getProduct,
} from "@/lib/actions";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrderCard from "../card/OrderCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DeliveredOrders() {
  const [updateOrder] = useUpdateOrderMutation();
  const [orders, setOrders] = useState<Order[]>([]);
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

  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderDelivered();
        console.log(data);
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders");
        console.log("Error fetching data", err);
      }
    };
    fetchOrders();
  }, [refreshOrders]);

  const toggleEdit = async (id: string | null) => {
    if (typeof id === "string") {
      try {
        const result: Order = await getOrder(id);
        setOrderID(result._id);
        setPaymentStatus(result?.payment_status);
        setOrderStatus(result?.status);
      } catch (error) {}
    }
    setOrderEditModal((prevState) => !prevState);
  };

  const toggleViewOrderItems = async (orderId: string | null) => {
    setIsLoading(true);
    if (typeof orderId === "string") {
      try {
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
      } catch (error) {}
    }
    setExpandedCardId(expandedCardId === orderId ? null : orderId);
    setIsLoading(false);
  };

  const handleUpdateOnClick = async () => {
    try {
      const orderDetails = { id: orderID, status: orderStatus, payment_status };
      const result = await updateOrder(orderDetails).unwrap();
      console.log(result);
      console.log("Order updated successfully");

      setRefreshOrders((prev) => !prev);
      toggleEdit(null);
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    return (
      order.user.first_name.toLowerCase().includes(query) ||
      order.user.last_name.toLowerCase().includes(query) ||
      order.user.email.toLowerCase().includes(query) ||
      order._id.toLowerCase().includes(query)
    );
  });

  return (
    <>
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
      <div className="flex justify-center mb-4 px-3">
        <Input
          type="text"
          placeholder="Search by name, email, or order ID..."
          className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-2 border rounded text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Order Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((item) => (
            <OrderCard
              key={item._id}
              id={item._id}
              user={item.user}
              totalAmount={item.total_amount}
              paymentStatus={item.payment_status}
              orderStatus={item.status}
              orderDate={item.order_date}
              toggleEdit={() => toggleEdit(item._id)}
              orderedItems={orderedItems}
              viewOrderItems={expandedCardId === item._id}
              toggleViewOrderItems={() => toggleViewOrderItems(item._id)}
              isLoading={isLoading}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No matching orders found.
          </p>
        )}
      </div>
    </>
  );
}
