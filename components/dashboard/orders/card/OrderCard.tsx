import React from "react";
import SpinnerSmall from "@/components/Loader/Loader-two/page";
import {
  BaggageClaim,
  Calendar,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  PackageCheck,
  User2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
// import { cn } from "@/lib/utils";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function OrderCard({
  id,
  user,
  order,
  toggleEdit,
  orderedItems,
  viewOrderItems,
  toggleViewOrderItems,
  isLoading,
}: {
  id: string;
  user: User;
  order: Order;
  toggleEdit?: () => void;
  orderedItems?: any;
  viewOrderItems?: boolean;
  toggleViewOrderItems?: () => void;
  isLoading?: boolean;
}) {
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

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-4 bg-gray-50/50 dark:bg-black/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-sm text-gray-600">
              Order #{id.slice(-6)}
            </span>
          </div>
          {/* <Badge
            variant="outline"
            className={cn("capitalize", getStatusColor(order.status))}
          >
            {order.status}
          </Badge> */}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div className="grid gap-3">
          <Link
            href={`${SERVER_URL}/dashboard/users/${user.email}`}
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <User2 className="w-4 h-4" />
            <span className="text-sm font-medium">
              {user.first_name} {user.last_name}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <CircleDollarSign className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium">
              GHS {order.total_amount}
            </span>
            {/* <Badge
              variant="outline"
              className={cn(
                "ml-2 capitalize",
                getPaymentStatusColor(order.payment_status)
              )}
            >
              {order.payment_status}
            </Badge> */}
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {new Date(order.order_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center gap-2"
            onClick={toggleViewOrderItems}
          >
            <span className="text-sm">View order items</span>
            {viewOrderItems ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <SpinnerSmall />
          </div>
        ) : (
          viewOrderItems && (
            <div key={"1"} className="pt-2 space-y-3">
              {orderedItems.map((item: any) => (
                <div key={item._id} className="group">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50/50 dark:bg-black/20 group-hover:bg-gray-100/80 dark:group-hover:bg-black/50 transition-colors">
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
  );
}
