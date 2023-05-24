import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    shipping_address: {},
    order_items: [],
    total_price: 0,
  },
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
      state.shipping_address = action.payload.shipping_address;
      state.order_items = action.payload.order_items;
      state.total_price = action.payload.total_price;
    },

    cancelOrderState(state, action) {
      const id = action.payload;
      state.order.forEach((order_item) => {
        if (order_item.id === id) {
          order_item.status = "canceled";
        }
      });
    },

    payOrderState(state, action) {
      const id = action.payload;
      state.order.forEach((order_item) => {
        if (order_item.id === id) {
          order_item.paid = true;
        }
      });
    },
  },
});

export const { setOrder, cancelOrderState, payOrderState } = orderSlice.actions;
export default orderSlice.reducer;
