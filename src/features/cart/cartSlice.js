import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItem,
  fetchItemsByUserID,
  resetCart,
  updateItem,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateItemAsync = createAsyncThunk(
  "cart/updateItem",
  async (update) => {
    const response = await updateItem(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const deleteItemAsync = createAsyncThunk(
  "cart/deleteItem",
  async (itemId) => {
    const response = await deleteItem(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserID",
  async (userId) => {
    const response = await fetchItemsByUserID(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
