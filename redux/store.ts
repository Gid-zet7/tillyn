import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../app/api/apiSlice";
import { cartReducer } from "./slices/cartSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});
setupListeners(store.dispatch);

export const persistor = persistStore(store);

persistor.subscribe(() => {
  const state = store.getState();
  console.log("Updated state after persist:", state);
});
