import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";

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
      const response = await axios.get(
        `${base_url}product?${data?.brand ? `brand=${data?.brand}&&` : ""}${
          data?.tag ? `tags=${data?.tag}&&` : ""
        }${data?.category ? `category=${data?.category}&&` : ""}${
          data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""
        }${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${
          data?.sort ? `sort=${data?.sort}&&` : ""
        }`
      );
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
    const { token } = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.put(
        `${base_url}product/wishlist`,
        { prodId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);
      return response?.data;
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
