import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const CartSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
  },
});
export const { addCartItems } = CartSlice.actions;
export default CartSlice.reducer;
