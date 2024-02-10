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

const getElementFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

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

export const addToWishlist = createAsyncThunk(
  "products/addToWishlist",
  async (prodId, thunkAPI) => {
    try {
      const response = await axios.put(
        `${base_url}product/wishlist`,
        { prodId },
        {
          headers: {
            Authorization: `Bearer ${
              getElementFromLocalStorage !== null
                ? getElementFromLocalStorage.token
                : ""
            }`,
          },
          accept: "application/json",
        }
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
        state.products = action.error;
      });
  },
});

export default productSlice.reducer;
