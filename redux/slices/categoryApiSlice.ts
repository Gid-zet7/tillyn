import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Create an EntityAdapter for category
const categoryAdapter = createEntityAdapter({});

// Define the initial state for the category slice
const initialState = categoryAdapter.getInitialState();

// Extend the API slice with the category endpoints
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/category",
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Category[]) => {
        const loadedCategories = responseData.map((category) => ({
          ...category,
          id: category._id, // Map _id to id
        }));
        return categoryAdapter.setAll(initialState, loadedCategories);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Category", id: "CATEGORIES-LIST" },
              ...result.ids.map((id) => ({ type: "Category", id })),
            ]
          : [{ type: "Category", id: "CATEGORIES-LIST" }],
    }),
    getCategory: builder.query({
      query: (categoryId: string) => ({
        url: `/category/${categoryId}`,
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: Order[]) => {
        const loadedCategory = responseData.map((category) => ({
          ...category,
          id: category._id, // Map _id to id
        }));
        return categoryAdapter.setAll(initialState, loadedCategory);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "Category", id: "CATEGORY-LIST" },
              ...result.ids.map((id) => ({ type: "Category", id })),
            ]
          : [{ type: "Category", id: "CATEGORY-LIST" }],
    }),
    addNewCategory: builder.mutation<void, Partial<Category>>({
      query: (initialCategoryData) => ({
        url: "/category/new",
        method: "POST",
        body: {
          ...initialCategoryData,
        },
      }),
      invalidatesTags: [{ type: "Category", id: "CATEGORY-LIST" }],
    }),
    updateCategory: builder.mutation<void, Partial<Category>>({
      query: (initialCategoryData) => ({
        url: "/category/update",
        method: "PATCH",
        body: {
          ...initialCategoryData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Category", id: arg._id },
      ],
    }),
    deleteCategory: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: "/category/delete",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Category", id: arg.id },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddNewCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;

// Selector to get the result of the `getCategory` query
export const selectCategoriesResult =
  categoryApiSlice.endpoints.getCategories.select();

// Creates memoized selector for category data
const selectCategoriesData = createSelector(
  selectCategoriesResult,
  (ordersResult) => ordersResult?.data ?? initialState // Fallback to initial state if no data
);

// Extract entity selectors with appropriate aliases
export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoryAdapter.getSelectors(
  (state: any) => selectCategoriesData(state) ?? initialState
);
