import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    data: [],
    length: 0,
  },
  reducers: {
    fetchCartRequest: (state) => {
      state.loading = true;
    },
    fetchCartSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.length = action.payload.length;
    },
    fetchCartFailure: (state) => {
      state.loading = false;
    },
    addToCartRequest: (state) => {
      state.loading = true;
    },
    addToCartSuccess: (state) => {
      state.loading = false;
      state.length += 1;
    },
    addToCartFailure: (state) => {
      state.loading = false;
    },
    deleteCartRequest: (state) => {
      state.loading = true;
    },
    deleteCartSuccess: (state, action) => {
      state.loading = false;
      const index = state.data.findIndex(
        (item) => item._id === action.payload.productId
      );
      if (index !== -1) {
        state.data.splice(index, 1);
        state.length -= 1;
      }
    },
    deleteCartFailure: (state) => {
      state.loading = false;
    },
    incrementCartRequest: (state) => {
      state.loading = true;
    },
    incrementCartSuccess: (state, action) => {
      state.loading = false;
      state.data.map((item) => {
        if (item._id === action.payload.productId) {
          if (item.productQuantity < 10) item.productQuantity += 1;
        }
        return item;
      });
    },
    incrementCartFailure: (state) => {
      state.loading = false;
    },
    decrementCartRequest: (state) => {
      state.loading = true;
    },
    decrementCartSuccess: (state, action) => {
      state.loading = false;
      state.data.map((item) => {
        if (item._id === action.payload.productId) {
          if (item.productQuantity > 1) item.productQuantity -= 1;
        }
        return item;
      });
    },
    decrementCartFailure: (state) => {
      state.loading = false;
    },
    clearCart: (state) => {
      state.data = [];
      state.length = 0
    },
  },
});

export const {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  deleteCartRequest,
  deleteCartSuccess,
  deleteCartFailure,
  incrementCartRequest,
  incrementCartSuccess,
  incrementCartFailure,
  decrementCartRequest,
  decrementCartSuccess,
  decrementCartFailure,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
