import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices/userReducer";
import productReducer from "./slices/productSlices/productReducer";
import cartReducer from "./slices/cartSlices/cartReducer";
import orderReducer from "./slices/orderSlices/orderReducer";

const store = configureStore({
  reducer: {
    userStore: userReducer,
    productStore: productReducer,
    cartStore: cartReducer,
    orderStore: orderReducer,
  },
});

export default store;
