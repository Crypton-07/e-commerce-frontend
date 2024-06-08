import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProducts,
  fetchProductByFilter,
  fetchProductsById,
  updateProduct,
} from "./productListAPI";

export const initialState = {
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

export const createProductsAsync = createAsyncThunk(
  "product/createProduct",
  async (newProduct) => {
    const response = await createProduct(newProduct);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateProductsAsync = createAsyncThunk(
  "product/updateProduct",
  async (update) => {
    const response = await updateProduct(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductByFilter",
  async ({ filterProduct, sortProduct, pagination, admin }) => {
    // console.log(filter, sort);
    const response = await fetchProductByFilter(
      filterProduct,
      sortProduct,
      pagination,
      admin
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
    clearSelectedProduct: (state, action) => {
      state.selectedProductId = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createProductsAsync.fulfilled,
        (state = initialState, action) => {
          state.status = "idle";
          // console.log(action?.payload);
          // state.products = [{ ...state.products }, action?.payload];
          state.products.push(action?.payload);
        }
      )
      .addCase(updateProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (item) => item.id === action?.payload?.id
        );
        state.products[index] = action?.payload;
        state.selectedProductId = action?.payload;
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
        state.totalItems = action.payload.totalItems;
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

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProduct = (state) => state.product.products; //? remove data
export const selectTotalCount = (state) => state.product.totalItems; //? products.length
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectedProductId;
export const selectStatus = (state) => state.product.status;

export default productSlice.reducer;
