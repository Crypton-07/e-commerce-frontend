import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser } from "./authAPI";
const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createUserAync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const checkUserAync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export const { increment } = userSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const userErrorInfo = (state) => state.auth.error;

export default userSlice.reducer;
