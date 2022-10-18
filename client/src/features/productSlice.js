import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../services/productService";

export const getProducts = createAsyncThunk("products", async (thunkAPI) => {
  try {
    const data = await productService.getProducts();
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
export const postProduct = createAsyncThunk(
  "postProduct",
  async (item, thunkAPI) => {
    try {
      const data = await productService.postProduct(item);
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
export const putProduct = createAsyncThunk(
  "putProduct",
  async (item, thunkAPI) => {
    try {
      const data = await productService.putProduct(item);
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
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (item, thunkAPI) => {
    try {
      const data = await productService.deleteProduct(item);
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
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        // state = action.payload;
        return [...action.payload];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state = null;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        // state = action.payload;
        return [...state, action.payload];
      })
      .addCase(postProduct.rejected, (state, action) => {
        // state = null;
      })
      .addCase(putProduct.fulfilled, (state, action) => {
        // state = action.payload;
        const newState = state?.map((category) => {
          return category.id === action.payload.id ? action.payload : category;
        });
        return [...newState];
      })
      .addCase(putProduct.rejected, (state, action) => {
        // state = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        // state = action.payload;
        const newState = state?.filter((category) => {
          return category.id !== action.payload.id;
        });
        return [...newState];
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        // state = null;
      });
  },
});
export default categorySlice.reducer;
