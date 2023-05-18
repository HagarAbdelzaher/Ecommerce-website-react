import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    totalAmount: 0,
  },
  reducers: {
    setWishlist(state, action) {
      state.wishlist = action.payload;
      state.totalAmount = state.wishlist.length;
      console.log(state.wishlist.length);
    },

    addToWishlist(state, action) {
      const item = action.payload;
      state.wishlist.push(item);
      state.totalAmount++;
    },
  },
});

export const { addToWishlist, setWishlist, getWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
