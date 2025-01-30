import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const baseQuery = fetchBaseQuery({
  baseUrl: `${SERVER_URL}/api/`,
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
