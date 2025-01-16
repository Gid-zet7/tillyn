import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Create an EntityAdapter for User
const usersAdapter = createEntityAdapter({});

// Define the initial state for the User slice
const initialState = usersAdapter.getInitialState();

// Extend the API slice with the User endpoints
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: User[]) => {
        const loadedUsers = responseData.map((user) => ({
          ...user,
          id: user._id, // Map _id to id
        }));
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result) =>
        result?.ids
          ? [
              { type: "User", id: "LIST" },
              ...result.ids.map((id) => ({ type: "User", id })),
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    addNewUser: builder.mutation<void, Partial<User>>({
      query: (initialUserData) => ({
        url: "/users/new",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation<void, Partial<User>>({
      query: (initialUserData) => ({
        url: "/users/update",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg._id }],
    }),
    deleteUser: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: "/users/delete",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

// Selector to get the result of the `getUsers` query
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// Creates memoized selector for users data
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? initialState // Fallback to initial state if no data
);

// Extract entity selectors with appropriate aliases
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state: any) => selectUsersData(state) ?? initialState
);
