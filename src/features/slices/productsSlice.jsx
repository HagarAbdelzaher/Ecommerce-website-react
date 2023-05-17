import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleCategory = createAsyncThunk(
  "products/fetchSingleCategory",
  async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/categories/${id}`);
    return response.data;
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/products/${id}`);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    singleCategory: JSON.parse(sessionStorage.getItem("singleCategory")),
    singleProduct: JSON.parse(sessionStorage.getItem("singleProduct")),
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleCategory.pending, (state) => {
        state.singleCategory = null;
      })
      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.singleCategory = action.payload;
        const savedState = JSON.stringify(action.payload);
        sessionStorage.setItem("singleCategory", savedState);
      })
      .addCase(fetchSingleCategory.rejected, (state) => {
        state.error = true;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProduct = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        const savedState = JSON.stringify(action.payload);
        sessionStorage.setItem("singleProduct", savedState);
      })
      .addCase(fetchSingleProduct.rejected, (state) => {
        state.error = true;
      });
  },
});

export default productSlice.reducer;