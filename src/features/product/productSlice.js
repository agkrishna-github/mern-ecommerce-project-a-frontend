import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const initialState = {
  products: [],
  isLoding: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getAllProductsa = createAsyncThunk(
  "products/getAllProductsa",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}product/`);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAproduct = createAsyncThunk(
  "products/getAproduct",
  async (prodId, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}product/${prodId}`);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "products/addToWishlist",
  async (prodId, thunkAPI) => {
    try {
      const response = await axios.put(
        `${base_url}product/wishlist`,
        { prodId },
        config
      );
      console.log(response.data);
      // return response?.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsa.pending, (state, action) => {
        state.isLoding = true;
      })
      .addCase(getAllProductsa.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getAllProductsa.rejected, (state, action) => {
        state.isLoding = false;
        state.isSuccess = false;
        state.isError = true;
        state.products = action.error;
      })
      .addCase(getAproduct.pending, (state, action) => {
        state.isLoding = true;
      })
      .addCase(getAproduct.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isSuccess = true;
        state.isError = false;
        state.singleProduct = action.payload;
      })
      .addCase(getAproduct.rejected, (state, action) => {
        state.isLoding = false;
        state.isSuccess = false;
        state.isError = true;
        state.products = action.error;
      })
      .addCase(addToWishlist.pending, (state, action) => {
        state.isLoding = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isSuccess = true;
        state.isError = false;
        state.addToWishlist = action.payload;
        state.message = "Product added to wishlist";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoding = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
