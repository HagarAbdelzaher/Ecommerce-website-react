import { createSlice } from "@reduxjs/toolkit";
// import interceptorInstance from "../../axios";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    shipping_address: {},
    order_items: [],
    total_price: 0,
    payment_status: false,
  },
  reducers: {
    setOrder(state, action) {
      console.log('action.payload.orders');
      console.log(action.payload);
      console.log('action.payload.orders');
      state.order = action.payload;
      state.shipping_address = action.payload.shipping_address;
      state.order_items = action.payload.order_items;
      state.total_price = action.payload.total_price;
      state.payment_status = action.payload.payment_status;
    },

  },
});

export const { setOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
