import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProducts,
  fetchProductByFilter,
  fetchProductsById,
} from "./productListAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  totalItems: 0,
  status: "idle",
  selectedProductId: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilter",
  async ({ filterProduct, sortProduct, pagination }) => {
    // console.log(filter, sort);
    const response = await fetchProductByFilter(
      filterProduct,
      sortProduct,
      pagination
    );
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchByBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    // console.log(filter, sort);
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchByCategoriesAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    // console.log(filter, sort);
    const response = await fetchAllCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductsById",
  async (id) => {
    // console.log(filter, sort);
    const response = await fetchProductsById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
// export const fetchProductBySortingAsync = createAsyncThunk(
//   "product/fetchProductBySorting",
//   async (sort) => {
//     const response = await fetchProductBySorting(sort);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const productSlice = createSlice({
  name: "product",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchByCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchByCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchByBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchByBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.product;
        state.totalItems = action.payload.totalItemCount;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProductId = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProduct = (state) => state.product.products.data;
export const selectTotalCount = (state) => state.product.products.items;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectedProductId;
export const selectStatus = (state) => state.product.status;

export default productSlice.reducer;
