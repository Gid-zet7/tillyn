import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Create an EntityAdapter for Product
const productsAdapter = createEntityAdapter({});

// Define the initial state for the Product slice
const initialState = productsAdapter.getInitialState();

// Extend the API slice with the Product endpoints
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Product[]) => {
        const loadedProducts = responseData.map((product) => ({
          ...product,
          id: product._id,
        }));
        return productsAdapter.setAll(initialState, loadedProducts);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Product", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Product", id })),
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProduct: builder.query({
      query: (productId: string) => ({
        url: `/products/${productId}`,
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Product[]) => {
        const loadedProducts = responseData.map((product) => ({
          ...product,
          id: product._id, // Map _id to id
        }));
        return productsAdapter.setAll(initialState, loadedProducts);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Product", id: "RELATED_PRODUCTS_LIST" },
              ...result.ids.map((id) => ({ type: "Product", id })),
            ]
          : [{ type: "Product", id: "RELATED_PRODUCTS_LIST" }],
    }),
    getMenProducts: builder.query({
      query: () => ({
        url: "/products/men",
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Product[]) => {
        const loadedProducts = responseData.map((product) => ({
          ...product,
          id: product._id, // Map _id to id
        }));
        return productsAdapter.setAll(initialState, loadedProducts);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Product", id: "MEN-LIST" },
              ...result.ids.map((id) => ({ type: "Product", id })),
            ]
          : [{ type: "Product", id: "MEN-LIST" }],
    }),
    getMenShortsProducts: builder.query({
      query: () => ({
        url: "/products/men-shorts",
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Product[]) => {
        const loadedProducts = responseData.map((product) => ({
          ...product,
          id: product._id, // Map _id to id
        }));
        return productsAdapter.setAll(initialState, loadedProducts);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Product", id: "MEN_SHORTS_LIST" },
              ...result.ids.map((id) => ({ type: "Product", id })),
            ]
          : [{ type: "Product", id: "MEN_SHORTS_LIST" }],
    }),
    getMenTopsProducts: builder.query({
      query: () => ({
        url: "/products/men-tops",
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Product[]) => {
        const loadedProducts = responseData.map((product) => ({
          ...product,
          id: product._id, // Map _id to id
        }));
        return productsAdapter.setAll(initialState, loadedProducts);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Product", id: "MEN_TOPS_LIST" },
              ...result.ids.map((id) => ({ type: "Product", id })),
            ]
          : [{ type: "Product", id: "MEN_TOPS_LIST" }],
    }),
    getMenTopAndDownProducts: builder.query({
      query: () => ({
        url: "/products/men-top-and-down",
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Product[]) => {
        const loadedProducts = responseData.map((product) => ({
          ...product,
          id: product._id, // Map _id to id
        }));
        return productsAdapter.setAll(initialState, loadedProducts);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Product", id: "MEN_TOP_AND_DOWN_LIST" },
              ...result.ids.map((id) => ({ type: "Product", id })),
            ]
          : [{ type: "Product", id: "MEN_TOP_AND_DOWN_LIST" }],
    }),
    getWomenProducts: builder.query({
      query: () => ({
        url: `/products/women`,
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Product[]) => {
        const loadedProducts = responseData.map((product) => ({
          ...product,
          id: product._id, // Map _id to id
        }));
        return productsAdapter.setAll(initialState, loadedProducts);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Product", id: "WOMEN_PRODUCTS_LIST" },
              ...result.ids.map((id) => ({ type: "Product", id })),
            ]
          : [{ type: "Product", id: "WOMEN_PRODUCTS_LIST" }],
    }),
    getWomenPrintsProducts: builder.query({
      query: () => ({
        url: `/products/women-african-prints`,
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Product[]) => {
        const loadedProducts = responseData.map((product) => ({
          ...product,
          id: product._id, // Map _id to id
        }));
        return productsAdapter.setAll(initialState, loadedProducts);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Product", id: "WOMEN_PRINTS_LIST" },
              ...result.ids.map((id) => ({ type: "Product", id })),
            ]
          : [{ type: "Product", id: "WOMEN_PRINTS_LIST" }],
    }),
    getRelatedProducts: builder.query({
      query: (category: string) => ({
        url: `/products/related-products?id=${category}`,
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Product[]) => {
        const loadedProducts = responseData.map((product) => ({
          ...product,
          id: product._id, // Map _id to id
        }));
        return productsAdapter.setAll(initialState, loadedProducts);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Product", id: "RELATED_PRODUCTS_LIST" },
              ...result.ids.map((id) => ({ type: "Product", id })),
            ]
          : [{ type: "Product", id: "RELATED_PRODUCTS_LIST" }],
    }),
    getProductByCategory: builder.query({
      query: (category: string) => ({
        url: `/products/category?category=${category}`,
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Product[]) => {
        const loadedProducts = responseData.map((product) => ({
          ...product,
          id: product._id,
        }));
        return productsAdapter.setAll(initialState, loadedProducts);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Product", id: "RELATED_PRODUCTS_LIST" },
              ...result.ids.map((id) => ({ type: "Product", id })),
            ]
          : [{ type: "Product", id: "RELATED_PRODUCTS_LIST" }],
    }),
    addNewProduct: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/products/new",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }], // Invalidate cache for updated product list
    }),

    updateProduct: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/products/update",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg._id },
      ],
    }),
    deleteProduct: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: "/products/delete",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetMenProductsQuery,
  useGetMenShortsProductsQuery,
  useGetMenTopsProductsQuery,
  useGetProductByCategoryQuery,
  useGetMenTopAndDownProductsQuery,
  useGetWomenProductsQuery,
  useGetWomenPrintsProductsQuery,
  useGetRelatedProductsQuery,
  useAddNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;

// Selector to get the result of the `getProducts` query
export const selectProductsResult =
  productsApiSlice.endpoints.getProducts.select();

// Creates memoized selector for Products data
const selectProductsData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult?.data ?? initialState // Fallback to initial state if no data
);

// Extract entity selectors with appropriate aliases
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors(
  (state: any) => selectProductsData(state) ?? initialState
);
