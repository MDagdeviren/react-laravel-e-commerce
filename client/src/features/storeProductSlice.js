import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storeProductService from "../services/storeProductService";

export const getStoreProducts = createAsyncThunk(
  "storeProducts",
  async (item, thunkAPI) => {
    try {
      const data = await storeProductService.getStoreProducts(item);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch();
      return thunkAPI.rejectWithValue();
    }
  }
);
export const postStoreProduct = createAsyncThunk(
  "postStoreProduct",
  async (item, thunkAPI) => {
    try {
      const data = await storeProductService.postStoreProduct(item);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch();
      return thunkAPI.rejectWithValue();
    }
  }
);
export const putStoreProduct = createAsyncThunk(
  "putStoreProduct",
  async (item, thunkAPI) => {
    try {
      const data = await storeProductService.putStoreProduct(item);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch();
      return thunkAPI.rejectWithValue();
    }
  }
);
export const deleteStoreProduct = createAsyncThunk(
  "deleteStoreProduct",
  async (item, thunkAPI) => {
    try {
      const data = await storeProductService.deleteStoreProduct(item);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch();
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = [];
const categorySlice = createSlice({
  name: "storeProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStoreProducts.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(getStoreProducts.rejected, (state, action) => {
        state = null;
      })
      .addCase(postStoreProduct.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(postStoreProduct.rejected, (state, action) => {})
      .addCase(putStoreProduct.fulfilled, (state, action) => {
        const newState = state?.map((product) => {
          return product.id === action.payload.id ? action.payload : product;
        });
        return [...newState];
      })
      .addCase(putStoreProduct.rejected, (state, action) => {})
      .addCase(deleteStoreProduct.fulfilled, (state, action) => {
        const newState = state?.filter((product) => {
          return product.id !== action.payload.id;
        });
        return [...newState];
      })
      .addCase(deleteStoreProduct.rejected, (state, action) => {});
  },
});
export default categorySlice.reducer;
