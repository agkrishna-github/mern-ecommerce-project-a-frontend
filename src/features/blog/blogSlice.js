import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const initialState = {
  blogs: [],
  isLoding: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllBlogs = createAsyncThunk(
  "blogs/getAllBlogs",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}blog/`);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getblog = createAsyncThunk(
  "blogs/getAllBlogs",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}blog/`);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state, action) => {
        state.isLoding = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoding = false;
        state.isSuccess = false;
        state.isError = true;
        state.products = action.error;
      });
  },
});

export default blogSlice.reducer;
