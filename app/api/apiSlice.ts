import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/",
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
