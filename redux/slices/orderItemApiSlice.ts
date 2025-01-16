import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "@/app/api/apiSlice";

// Create an EntityAdapter for OrderItems
const orderItemsAdapter = createEntityAdapter({});

// Define the initial state for the OrderItems slice
const initialState = orderItemsAdapter.getInitialState();

// Extend the API slice with the OrderItems endpoints
export const orderItemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrderItems: builder.query({
      query: () => ({
        url: "/order-item",
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          console.log(response);
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: OrderedItem[]) => {
        const loadedOrderItems = responseData.map((orderItem) => ({
          ...orderItem,
          id: orderItem._id, // Map _id to id
        }));
        return orderItemsAdapter.setAll(initialState, loadedOrderItems);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "OrderItem", id: "ORDERITEMS-LIST" },
              ...result.ids.map((id) => ({ type: "OrderItem", id })),
            ]
          : [{ type: "OrderItem", id: "ORDERITEMS-LIST" }],
    }),
    getOrderedItems: builder.query({
      query: () => ({
        url: "/order-item/get-ordered-items",
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          console.log(response);
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: OrderedItem[]) => {
        const loadedOrderedItems = responseData.map((orderedItem) => ({
          ...orderedItem,
          id: orderedItem._id, // Map _id to id
        }));
        return orderItemsAdapter.setAll(initialState, loadedOrderedItems);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "OrderItem", id: "ORDERITEMS-LIST" },
              ...result.ids.map((id) => ({ type: "OrderItem", id })),
            ]
          : [{ type: "OrderItem", id: "ORDERITEMS-LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetAllOrderItemsQuery } = orderItemsApiSlice;

// Selector to get the result of the `getOrderItems` query
export const selectOrderItemsResult =
  orderItemsApiSlice.endpoints.getAllOrderItems.select();

// Creates memoized selector for orderItems data
const selectOrderItemsData = createSelector(
  selectOrderItemsResult,
  (orderItemsResult) => orderItemsResult?.data ?? initialState // Fallback to initial state if no data
);

// Extract entity selectors with appropriate aliases
export const {
  selectAll: selectAllOrderItems,
  selectById: selectOrderItemsById,
  selectIds: selectOrderItemsIds,
} = orderItemsAdapter.getSelectors(
  (state: any) => selectOrderItemsData(state) ?? initialState
);
