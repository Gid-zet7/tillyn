import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Create an EntityAdapter for cart
const cartAdapter = createEntityAdapter({});

// Define the initial state for the cart slice
const initialState = cartAdapter.getInitialState();

// Extend the API slice with the cart endpoints
export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: () => ({
        url: "/cart",
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          console.log(response);
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Cart[]) => {
        const loadedCart = responseData.map((cart) => ({
          ...cart,
          id: cart._id, // Map _id to id
        }));
        return cartAdapter.setAll(initialState, loadedCart);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Cart", id: "CART-LIST" },
              ...result.ids.map((id) => ({ type: "Cart", id })),
            ]
          : [{ type: "Cart", id: "CART-LIST" }],
    }),
    addNewCart: builder.mutation<void, Partial<Cart>>({
      query: (initialCartData) => ({
        url: "/cart/new",
        method: "POST",
        body: {
          ...initialCartData,
        },
      }),
      invalidatesTags: [{ type: "Cart", id: "CART-LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetCartsQuery, useAddNewCartMutation } = cartApiSlice;

// Selector to get the result of the `getCart` query
export const selectCartsResult = cartApiSlice.endpoints.getCarts.select();

// Creates memoized selector for Cart data
const selectCartData = createSelector(
  selectCartsResult,
  (cartResult) => cartResult?.data ?? initialState // Fallback to initial state if no data
);

// Extract entity selectors with appropriate aliases
export const {
  selectAll: selectAllCart,
  selectById: selectCartById,
  selectIds: selectCartIds,
} = cartAdapter.getSelectors(
  (state: any) => selectCartData(state) ?? initialState
);
