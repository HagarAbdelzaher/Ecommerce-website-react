import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/authSlice";
import productsReducer from "../features/slices/productsSlice";
import cartReducer from "../features/slices/cartSlice";
import wishlistReducer from "../features/slices/wishlistSlice";
export const store = configureStore({
  reducer: {
    user: authReducer,
    products: productsReducer,
    cart :cartReducer ,
    wishlist : wishlistReducer,
  },
});
