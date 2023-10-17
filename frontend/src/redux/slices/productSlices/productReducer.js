import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.data = null;
      state.error = "Product Not Fetched";
    },
  },
});

export const { fetchRequest, fetchSuccess, fetchFailure } =
  productSlice.actions;

export default productSlice.reducer;
