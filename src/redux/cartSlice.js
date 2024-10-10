import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.items.push(action.payload);
    },
    addMultipleItemsToCart: (state, action) => {
      const itemArr = action.payload;
      itemArr.forEach((item) => {
        state.items.push(item);
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
