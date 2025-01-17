import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

type OrderDetails = { email: string; subtotal: number; cartItem: CartItem[] };

// Create an EntityAdapter for order
const ordersAdapter = createEntityAdapter({});

// Define the initial state for the order slice
const initialState = ordersAdapter.getInitialState();

// Extend the API slice with the order endpoints
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          console.log(response);
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Order[]) => {
        const loadedOrders = responseData.map((order) => ({
          ...order,
          id: order._id, // Map _id to id
        }));
        return ordersAdapter.setAll(initialState, loadedOrders);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Order", id: "ORDERS-LIST" },
              ...result.ids.map((id) => ({ type: "Order", id })),
            ]
          : [{ type: "Order", id: "ORDERS-LIST" }],
    }),
    getUserOrders: builder.query({
      query: (userId: string) => ({
        url: `/orders/user-order?id=${userId}`,
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          console.log(response);
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Order[]) => {
        const loadedUserOrders = responseData.map((order) => ({
          ...order,
          id: order._id, // Map _id to id
        }));
        return ordersAdapter.setAll(initialState, loadedUserOrders);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Order", id: "USERS-ORDERS-LIST" },
              ...result.ids.map((id) => ({ type: "Order", id })),
            ]
          : [{ type: "Order", id: "USERS-ORDERS-LIST" }],
    }),
    addNewOrder: builder.mutation<void, Partial<OrderDetails>>({
      query: (initialOrderData) => ({
        url: "/orders/new",
        method: "POST",
        body: JSON.stringify(initialOrderData),
      }),
      invalidatesTags: [{ type: "Order", id: "ORDERS-LIST" }],
    }),
    updateOrder: builder.mutation<void, Partial<Order>>({
      query: (initialOrderData) => ({
        url: "/orders/update",
        method: "PATCH",
        body: JSON.stringify(initialOrderData),
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg._id }],
    }),
    deleteOrder: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: "/orders/delete",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useAddNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApiSlice;

// Selector to get the result of the `getOrders` query
export const selectOrdersResult = ordersApiSlice.endpoints.getOrders.select();

// Creates memoized selector for orders data
const selectOrdersData = createSelector(
  selectOrdersResult,
  (ordersResult) => ordersResult?.data ?? initialState // Fallback to initial state if no data
);

// Extract entity selectors with appropriate aliases
export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
} = ordersAdapter.getSelectors(
  (state: any) => selectOrdersData(state) ?? initialState
);
