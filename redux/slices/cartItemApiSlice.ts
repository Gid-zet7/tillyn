import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Create an EntityAdapter for cartItem
const cartItemsAdapter = createEntityAdapter({});

// Define the initial state for the cartItem slice
const initialState = cartItemsAdapter.getInitialState();

// Extend the API slice with the cartItem endpoints
export const cartItemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: () => ({
        url: "/cart-items",
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: CartItem[]) => {
        const loadedCartItems = responseData.map((cartItem) => ({
          ...cartItem,
          id: cartItem._id, // Map _id to id
        }));
        return cartItemsAdapter.setAll(initialState, loadedCartItems);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "CartItem", id: "CARTITEM-LIST" },
              ...result.ids.map((id) => ({ type: "CartItem", id })),
            ]
          : [{ type: "CartItem", id: "CARTITEM-LIST" }],
    }),
    getUserCartItems: builder.query({
      query: (cartId: string) => ({
        url: `/cart-items/${cartId}`,
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: CartItem[]) => {
        const loadedUserCartItems = responseData.map((cartItem) => ({
          ...cartItem,
          id: cartItem._id, // Map _id to id
        }));
        return cartItemsAdapter.setAll(initialState, loadedUserCartItems);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "CartItem", id: "USER-CARTITEM-LIST" },
              ...result.ids.map((id) => ({ type: "CartItem", id })),
            ]
          : [{ type: "CartItem", id: "USER-CARTITEM-LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetCartItemsQuery, useGetUserCartItemsQuery } =
  cartItemsApiSlice;

// Selector to get the result of the `getCartItems` query
export const selectCartItemsResult =
  cartItemsApiSlice.endpoints.getCartItems.select();

// Creates memoized selector for CartItems data
const selectCartItemsData = createSelector(
  selectCartItemsResult,
  (cartItemsResult) => cartItemsResult?.data ?? initialState // Fallback to initial state if no data
);

// Extract entity selectors with appropriate aliases
export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
  selectIds: selectCartItemIds,
} = cartItemsAdapter.getSelectors(
  (state: any) => selectCartItemsData(state) ?? initialState
);
