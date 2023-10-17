import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    fetchOrderRequest: (state) => {
      state.loading = true;
    },
    fetchOrderSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchOrderFailure: (state) => {
      state.loading = false;
    },
    addOrderRequest: (state) => {
      state.loading = true;
    },  
    addOrderSuccess: (state) => {
      state.loading = false;
    },
    addOrderFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchOrderRequest,
  fetchOrderSuccess,
  fetchOrderFailure,
  addOrderRequest,
  addOrderSuccess,
  addOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
