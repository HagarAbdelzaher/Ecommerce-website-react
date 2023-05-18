import { createSlice } from "@reduxjs/toolkit";
import interceptorInstance from "../../axios";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    amount: 0,
    totalAmount: 0,
    totalPrice: 0,
  },
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
      state.totalAmount = state.cart.length;
      state.totalPrice = state.cart.reduce(
        (total, item) => total + (item.quantity * item.product.price),
        0
      );
    },

    editquantity(state, action) {
      const { selected_item, newQuantity } = action.payload;
      const quantity_difference =  newQuantity - selected_item.quantity
      state.totalPrice  = state.totalPrice  +  (selected_item.product.price * quantity_difference);
      state.cart.map((item) => {
        if (selected_item.id === item.id) item.quantity = newQuantity;
        return item;
      });
    },
    removeFromCart(state, action) {
      const selected_item = action.payload;
          state.cart = state.cart.filter(
            (item) => item.id !== selected_item.id
          );
          state.totalAmount -=1;
          state.totalPrice  -= (selected_item.product.price * selected_item.quantity)
    },
  },
});

export const { removeFromCart, setCart, editquantity } =
  cartSlice.actions;
export default cartSlice.reducer;
