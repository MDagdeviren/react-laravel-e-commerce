import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../services/categoryService";

export const getCategories = createAsyncThunk(
  "categories",
  async (thunkAPI) => {
    try {
      const data = await categoryService.getCategories();

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
export const postCategory = createAsyncThunk(
  "postCategory",
  async (item, thunkAPI) => {
    try {
      const data = await categoryService.postCategory(item);

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
export const putCategory = createAsyncThunk(
  "putCategory",
  async (item, thunkAPI) => {
    try {
      const data = await categoryService.putCategory(item);
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
export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (item, thunkAPI) => {
    try {
      const data = await categoryService.deleteCategory(item);
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
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        return [...action.payload];
      })
      .addCase(getCategories.rejected, (state, action) => {
        state = null;
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        // state = action.payload;
        return [...state, action.payload];
      })

      .addCase(putCategory.fulfilled, (state, action) => {
        // state = action.payload;
        const newState = state?.map((category) => {
          return category.id === action.payload.id ? action.payload : category;
        });
        return [...newState];
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        // state = action.payload;
        const newState = state?.filter((category) => {
          return category.id !== action.payload.id;
        });
        return [...newState];
      });
  },
});
export default categorySlice.reducer;
