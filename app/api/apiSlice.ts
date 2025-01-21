import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://tillyn-update.vercel.app/api/",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    "User",
    "Product",
    "Order",
    "OrderItem",
    "Category",
    "CartItem",
    "Cart",
  ],
  endpoints: (builder) => ({}),
});
