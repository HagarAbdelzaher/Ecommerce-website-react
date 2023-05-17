import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    totalAmount: 0,
  
  },
  reducers: {
    addToWishlist(state, action) {
      const productId = action.payload;
      try {
        const exist = state.wishlist.find(
          (product) =>
            product.id === productId.id 
        );
        if (exist) {
     return;
        } else {
          state.wishlist.push({
            id: productId.id,
            price: productId.price,
            image :productId.image,
            name: productId.name,
            description: productId.description,
        
          });
          state.totalAmount++;
    
        }
      } catch (err) {
        return err;
      }
    }
   }} );

export const { addToWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;
