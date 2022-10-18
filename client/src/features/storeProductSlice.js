import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storeProductService from "../services/storeProductService";

export const getStoreProducts = createAsyncThunk(
  "storeProducts",
  async (item, thunkAPI) => {
    try {
      const data = await storeProductService.getStoreProducts(item);
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
export const postStoreProduct = createAsyncThunk(
  "postStoreProduct",
  async (item, thunkAPI) => {
    try {
      const data = await storeProductService.postStoreProduct(item);
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
export const putStoreProduct = createAsyncThunk(
  "putStoreProduct",
  async (item, thunkAPI) => {
    try {
      const data = await storeProductService.putStoreProduct(item);
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
export const deleteStoreProduct = createAsyncThunk(
  "deleteStoreProduct",
  async (item, thunkAPI) => {
    try {
      const data = await storeProductService.deleteStoreProduct(item);
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
const categorySlice = createSlice({
  name: "storeProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStoreProducts.fulfilled, (state, action) => {
        // state = action.payload;
        return [...action.payload];
      })
      .addCase(getStoreProducts.rejected, (state, action) => {
        state = null;
      })
      .addCase(postStoreProduct.fulfilled, (state, action) => {
        // state = action.payload;
        return [...action.payload];
      })
      .addCase(postStoreProduct.rejected, (state, action) => {
        // state = null;
      })
      .addCase(putStoreProduct.fulfilled, (state, action) => {
        // state = action.payload;
        const newState = state?.map((product) => {
          return product.id === action.payload.id ? action.payload : product;
        });
        return [...newState];
      })
      .addCase(putStoreProduct.rejected, (state, action) => {
        // state = null;
      })
      .addCase(deleteStoreProduct.fulfilled, (state, action) => {
        // state = action.payload;
        const newState = state?.filter((product) => {
          return product.id !== action.payload.id;
        });
        return [...newState];
      })
      .addCase(deleteStoreProduct.rejected, (state, action) => {
        // state = null;
      });
  },
});
export default categorySlice.reducer;
