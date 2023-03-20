import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import { setMessage } from "./messageSlice";
const token = JSON.parse(localStorage.getItem("token"));

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, key }, thunkAPI) => {
    try {
      const response = await authService.register(name, email, password, key);
      thunkAPI.dispatch(setMessage(response.data.message)); //Toastr da yazdır
      console.log(response);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk("auth/login", async (item, thunkAPI) => {
  try {
    const data = await authService.login(item);
    return { token: data.token };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const initialState = token
  ? { isLoggedIn: true, token }
  : { isLoggedIn: false, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.token = null;
      });
  },
});
export default authSlice.reducer;
