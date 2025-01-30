import CartItem from "@/db/models/cartItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type CartState = any[];

const initialState = {
  items: [],
  _persist: undefined,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const itemExists: any = state.items.find(
        (item: CartItem) => item._id === action.payload._id
      );

      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<any>) => {
      const item: any = state.items.find(
        (item: CartItem) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<any>) => {
      const item: any = state.items.find(
        (item: Product) => item._id === action.payload._id
      );

      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (item: Product) => item._id !== action.payload._id
          );
        } else {
          item.quantity--;
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      state.items = state.items.filter(
        (item: Product) => item._id !== action.payload._id
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
