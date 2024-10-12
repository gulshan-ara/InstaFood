import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.card?.info?.id === action.payload.card.info.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    addMultipleItemsToCart: (state, action) => {
      const itemArr = action.payload;
      itemArr.forEach((item) => {
        const existingItem = state.items.find(
          (cartItem) => cartItem.card?.info?.id === item.card?.info?.id
        );
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          state.items.push({ ...item, quantity: item.quantity || 1 });
        }
      });
    },
    removeItem: (state, action) => {
      const itemId = action.payload.card?.info?.id;
      state.items = state.items.filter(
        (item) => item.card?.info?.id !== itemId
      );
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const {
  addItemToCart,
  addMultipleItemsToCart,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
