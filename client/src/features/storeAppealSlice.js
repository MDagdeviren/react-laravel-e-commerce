import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storeAppealService from "../services/storeAppealService";
export const getStoreAppeal = createAsyncThunk(
  "getStoreAppeal",
  async (item, thunkAPI) => {
    try {
      const data = await storeAppealService.getStoreAppeal(item);
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

export const postStoreAppeal = createAsyncThunk(
  "postStoreAppeal",
  async (item, thunkAPI) => {
    try {
      const data = await storeAppealService.postStoreAppeal(item);
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
export const putStoreAppeal = createAsyncThunk(
  "putStoreAppeal",
  async (item, thunkAPI) => {
    try {
      const data = await storeAppealService.putStoreAppeal(item);
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
export const deleteStoreAppeal = createAsyncThunk(
  "deleteStoreAppeal",
  async (item, thunkAPI) => {
    try {
      const data = await storeAppealService.deleteStoreAppeal(item);
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
const initialState = {};
const storeAppealSlice = createSlice({
  name: "storeAppeal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStoreAppeal.fulfilled, (state, action) => {
        // console.log(action);
        return { ...action.payload };
      })
      .addCase(getStoreAppeal.rejected, (state, action) => {
        state = null;
      })
      .addCase(postStoreAppeal.fulfilled, (state, action) => {
        // state = action.payload;
        return { ...state, ...action.payload };
      })
      .addCase(postStoreAppeal.rejected, (state, action) => {
        // state = null;
      })
      .addCase(putStoreAppeal.fulfilled, (state, action) => {
        return { ...action.payload };
      })
      .addCase(putStoreAppeal.rejected, (state, action) => {
        // state = null;
      })
      .addCase(deleteStoreAppeal.fulfilled, (state, action) => {
        return {};
      })
      .addCase(deleteStoreAppeal.rejected, (state, action) => {
        // state = null;
      });
  },
});
export default storeAppealSlice.reducer;
