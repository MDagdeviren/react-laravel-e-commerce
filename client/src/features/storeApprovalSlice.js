import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storeApprovalService from "../services/storeApprovalService";

export const getApprovalStores = createAsyncThunk(
  "getApprovalStores",
  async (thunkAPI) => {
    try {
      const data = await storeApprovalService.getApprovalStores();
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch();
      return thunkAPI.rejectWithValue();
    }
  }
);
export const postApprovalStore = createAsyncThunk(
  "postApprovalStore",
  async (item, thunkAPI) => {
    try {
      const data = await storeApprovalService.postApprovalStore(item);
      console.log(data);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      thunkAPI.dispatch();
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = [];
const storeApprovalSlice = createSlice({
  name: "storeApproval",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApprovalStores.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(getApprovalStores.rejected, (state, action) => {})
      .addCase(postApprovalStore.fulfilled, (state, action) => {
        const newState = state?.filter((store) => {
          return store.id !== action.payload.id;
        });
        return [...newState];
      })
      .addCase(postApprovalStore.rejected, (state, action) => {});
  },
});
export default storeApprovalSlice.reducer;
