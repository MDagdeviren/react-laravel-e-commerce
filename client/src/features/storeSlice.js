import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storeService from "../services/storeService";

export const getStores = createAsyncThunk("getStores", async (thunkAPI) => {
  try {
    const data = await storeService.getStores();

    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch();
    return thunkAPI.rejectWithValue();
  }
});

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
