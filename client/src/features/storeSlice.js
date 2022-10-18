import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storeService from "../services/storeService";

export const getStores = createAsyncThunk("getStores", async (thunkAPI) => {
  try {
    const data = await storeService.getStores();
    //   console.log(data);
    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    thunkAPI.dispatch();
    return thunkAPI.rejectWithValue();
  }
});
/*
export const getStoreInfo = createAsyncThunk(
  "getStoreInfo",
  async (thunkAPI) => {
    try {
      const data = await storeService.getStoreInfo();
      //   console.log(data);
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
*/
const initialState = [];
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStores.fulfilled, (state, action) => {
        // state = action.payload;
        return [...action.payload];
      })
      .addCase(getStores.rejected, (state, action) => {
        state = null;
      });
  },
});
export default storeSlice.reducer;
