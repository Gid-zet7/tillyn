"use client";
import { format } from "date-fns";
import { useState } from "react";
import { getOrderItems, getProductById } from "@/lib/actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Package,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Calendar,
  PackageCheck,
} from "lucide-react";
import SpinnerSmall from "@/components/Loader/Loader-two/page";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  orders?: Order[] | undefined;
};

export default function OrdersCard({ orders }: Props) {
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
  const [orderedItems, setOrderedItems] = useState<{ product: any }[] | null>(
    null
  );
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const toggleViewOrderItems = async (orderId: string) => {
    if (expandedCardId === orderId) {
      setExpandedCardId(null);
      setOrderedItems(null);
      return;
    }

    setLoadingOrderId(orderId);
    try {
      const result: OrderedItem[] = await getOrderItems(orderId);
      const productsWithDetails = await Promise.all(
        result.map(async (item: any) => {
          const product = await getProductById(item.product);
          return {
            orderItemQuantity: item.quantity,
            product: product,
          };
        })
      );
      setOrderedItems(productsWithDetails);
      setExpandedCardId(orderId);
    } catch (error) {
      console.error("Failed to fetch order items", error);
    } finally {
      setLoadingOrderId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "confirmed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card className="bg-white shadow-sm rounded-lg overflow-hidden">
      <CardHeader className="border-b bg-gray-50/50 p-4">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-gray-500" />
          <h2 className="font-semibold">Order History</h2>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {orders?.map((order) => (
            <Card
              key={order._id}
              className="overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <CardHeader className="p-4 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PackageCheck className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-sm text-gray-600">
                      Order #{order._id.slice(-6)}
                    </span>
                  </div>
                  {/* <Badge variant="outline" className={cn("capitalize", getStatusColor(order.status))}>
                    {order.status}
                  </Badge> */}
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">
                      GHS {order.total_amount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {format(new Date(order.order_date), "PPP")}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2 hover:bg-gray-100"
                    onClick={() => toggleViewOrderItems(order._id)}
                    disabled={loadingOrderId === order._id}
                  >
                    <span className="text-sm">
                      {expandedCardId === order._id ? "Hide" : "View"} order
                      items
                    </span>
                    {expandedCardId === order._id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {loadingOrderId === order._id ? (
                  <div className="flex justify-center py-4">
                    <SpinnerSmall />
                  </div>
                ) : (
                  expandedCardId === order._id &&
                  orderedItems && (
                    <div className="pt-2 space-y-3">
                      {orderedItems.map((item: any) => (
                        <div key={item.product._id} className="group">
                          <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50/50 group-hover:bg-gray-100/80 transition-colors">
                            <div className="relative w-16 h-16 rounded-md overflow-hidden bg-white">
                              <Image
                                src={item.product.image_url}
                                fill
                                className="object-cover"
                                alt={item.product.name || "Product image"}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {item.product.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Quantity: {item.orderItemQuantity}
                              </p>
                              <p className="text-sm font-medium text-primary">
                                GHS {item.product.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
