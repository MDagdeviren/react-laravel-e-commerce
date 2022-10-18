import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subCategoryService from "../services/subCategoryService";
import { toast } from "react-toastify";

export const getSubCategories = createAsyncThunk(
  "subCategories",
  async (thunkAPI) => {
    try {
      const data = await subCategoryService.getSubCategories();
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
export const postSubCategory = createAsyncThunk(
  "postSubCategory",
  async (item, thunkAPI) => {
    try {
      const data = await subCategoryService.postSubCategory(item);
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
      toast.error("Message: " + message);
      thunkAPI.dispatch();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const putSubCategory = createAsyncThunk(
  "putSubCategory",
  async (item, thunkAPI) => {
    try {
      const data = await subCategoryService.putSubCategory(item);
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
export const deleteSubCategory = createAsyncThunk(
  "deleteSubCategory",
  async (item, thunkAPI) => {
    try {
      const data = await subCategoryService.deleteSubCategory(item);
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
  name: "subCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubCategories.fulfilled, (state, action) => {
        // state = action.payload;
        return [...action.payload];
      })
      .addCase(getSubCategories.rejected, (state, action) => {
        state = null;
      })
      .addCase(postSubCategory.fulfilled, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(postSubCategory.rejected, (state, action) => {
        // state = null;
      })
      .addCase(putSubCategory.fulfilled, (state, action) => {
        const newState = state?.map((subCategory) => {
          return subCategory.id === action.payload.id
            ? action.payload
            : subCategory;
        });
        return [...newState];
      })
      .addCase(putSubCategory.rejected, (state, action) => {})
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        const newState = state?.filter((subCategory) => {
          return subCategory.id !== action.payload.id;
        });
        return [...newState];
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {});
  },
});
export default categorySlice.reducer;
