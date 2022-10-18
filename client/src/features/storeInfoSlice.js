import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storeService from "../services/storeService";
export const getStore = createAsyncThunk("getStore", async (thunkAPI) => {
  try {
    const data = await storeService.getStoreInfo();
    console.log(data);
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

export const putStore = createAsyncThunk("putStore", async (item, thunkAPI) => {
  try {
    const data = await storeService.putStore(item);
    console.log(data);
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
export const putLogo = createAsyncThunk("putLogo", async (item, thunkAPI) => {
  try {
    const data = await storeService.putLogo(item);
    console.log(data);
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
export const putCover = createAsyncThunk("putCover", async (item, thunkAPI) => {
  try {
    const data = await storeService.putCover(item);
    console.log(data);
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
const initialState = [];
const storeInfoSlice = createSlice({
  name: "storeInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStore.fulfilled, (state, action) => {
        return { ...action.payload };
      })
      .addCase(getStore.rejected, (state, action) => {
        state = null;
      })
      .addCase(putStore.fulfilled, (state, action) => {
        return { ...action.payload };
      })
      .addCase(putLogo.fulfilled, (state, action) => {
        return { ...action.payload };
      })
      .addCase(putCover.fulfilled, (state, action) => {
        return { ...action.payload };
      });
  },
});

export default storeInfoSlice.reducer;
