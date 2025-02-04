"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAllOrders, getOrderItems, getProduct } from "@/lib/actions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, DollarSign, Package, TrendingUp } from "lucide-react";

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  topProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
  revenueByDay: Array<{
    date: string;
    revenue: number;
  }>;
  monthlyGrowth: number;
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    topProducts: [],
    revenueByDay: [],
    monthlyGrowth: 0,
  });

  const { getUser, getPermission } = useKindeBrowserClient();
  const isAdmin = getPermission("admin")?.isGranted;
  const user = getUser();

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        const orders = await getAllOrders();
        const productStats = new Map();
        let totalRevenue = 0;
        const dailyRevenue = new Map();

        // Process each order
        for (const order of orders) {
          const items = await getOrderItems(order._id);
          let orderRevenue = 0;

          // Process each item in the order
          for (const item of items) {
            try {
              const product = await getProduct(item.product);

              // Skip if product not found or doesn't belong to current seller
              if (!product || product.seller?.email !== user?.email) {
                continue;
              }

              const revenue = product.price * item.quantity;
              orderRevenue += revenue;

              // Update product stats
              const currentStats = productStats.get(product._id) || {
                name: product.name,
                quantity: 0,
                revenue: 0,
              };
              productStats.set(product._id, {
                ...currentStats,
                quantity: currentStats.quantity + item.quantity,
                revenue: currentStats.revenue + revenue,
              });

              // Update daily revenue
              const date = new Date(order.order_date).toLocaleDateString();
              dailyRevenue.set(date, (dailyRevenue.get(date) || 0) + revenue);
            } catch (error) {
              console.error(`Error fetching product ${item.product}:`, error);
              // Continue processing other items
              continue;
            }
          }

          totalRevenue += orderRevenue;
        }

        // Calculate monthly growth
        const sortedDates = Array.from(dailyRevenue.keys()).sort();
        const currentMonth = new Date().getMonth();
        const currentMonthRevenue = Array.from(dailyRevenue.entries())
          .filter(([date]) => new Date(date).getMonth() === currentMonth)
          .reduce((acc, [_, revenue]) => acc + revenue, 0);
        const lastMonthRevenue = Array.from(dailyRevenue.entries())
          .filter(([date]) => new Date(date).getMonth() === currentMonth - 1)
          .reduce((acc, [_, revenue]) => acc + revenue, 0);
        const monthlyGrowth =
          lastMonthRevenue === 0
            ? 100
            : ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) *
              100;

        // Sort products by revenue
        const topProducts = Array.from(productStats.values())
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);

        // Format revenue by day for chart
        const revenueByDay = Array.from(dailyRevenue.entries())
          .map(([date, revenue]) => ({
            date,
            revenue,
          }))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        setStats({
          totalOrders: orders.length,
          totalRevenue,
          averageOrderValue: totalRevenue / orders.length || 0,
          topProducts,
          revenueByDay,
          monthlyGrowth,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setIsLoading(false);
      }
    };

    if (user?.email) {
      fetchDashboardStats();
    }
  }, [user]);

  const StatCard = ({ title, value, icon, description }: any) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === "number" && title.includes("$")
            ? `$${value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
            : value}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[100px]" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[200px] w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="Total earnings from all orders"
        />
        {isAdmin && (
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
            description="Total number of orders received"
          />
        )}
        <StatCard
          title="Average Order Value"
          value={stats.averageOrderValue}
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          description="Average revenue per order"
        />
        <StatCard
          title="Monthly Growth"
          value={`${stats.monthlyGrowth.toFixed(1)}%`}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          description="Revenue growth from last month"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Daily revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.revenueByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Best performing products by revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                  <Bar dataKey="quantity" fill="#82ca9d" name="Quantity Sold" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
