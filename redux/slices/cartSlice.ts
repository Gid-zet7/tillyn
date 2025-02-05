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
        (item: CartItem) =>
          item._id === action.payload._id &&
          item.selectedSize === action.payload.selectedSize
      );

      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<any>) => {
      const item: any = state.items.find(
        (item: CartItem) =>
          item._id === action.payload._id &&
          item.selectedSize === action.payload.selectedSize
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<any>) => {
      const item: any = state.items.find(
        (item: Product) =>
          item._id === action.payload._id &&
          item.selectedSize === action.payload.selectedSize
      );

      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (item: Product) =>
              !(
                item._id === action.payload._id &&
                item.selectedSize === action.payload.selectedSize
              )
          );
        } else {
          item.quantity--;
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      state.items = state.items.filter(
        (item: Product) =>
          !(
            item._id === action.payload._id &&
            item.selectedSize === action.payload.selectedSize
          )
      );
    },
    changeSize: (
      state,
      action: PayloadAction<{
        itemId: string;
        oldSize: string;
        newSize: string;
      }>
    ) => {
      const { itemId, oldSize, newSize } = action.payload;
      const item = state.items.find(
        (item: CartItem) => item._id === itemId && item.selectedSize === oldSize
      );

      if (item) {
        // Check if the new size already exists
        const existingItemWithNewSize = state.items.find(
          (item: CartItem) =>
            item._id === itemId && item.selectedSize === newSize
        );

        if (existingItemWithNewSize) {
          // If new size exists, add quantities and remove old item
          existingItemWithNewSize.quantity += item.quantity;
          state.items = state.items.filter(
            (item: CartItem) =>
              !(item._id === itemId && item.selectedSize === oldSize)
          );
        } else {
          // If new size doesn't exist, just update the size
          item.selectedSize = newSize;
        }
      }
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
  changeSize,
} = cartSlice.actions;
