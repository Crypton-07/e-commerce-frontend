import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productListSlice";
import authReducer from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import orderSlice from "../features/orders/orderSlice";
import userSlice from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartSlice,
    order: orderSlice,
    user: userSlice,
  },
});
