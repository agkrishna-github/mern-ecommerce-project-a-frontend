import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const initialState = {
  products: [],
  searchProductsList: [],
  keyword: "",
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
    const { auth } = thunkAPI.getState();

    try {
      const response = await axios.get(`${base_url}product/${prodId}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          Accept: "application/json",
        },
      });
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
      const response = await axios.put(`${base_url}product/wishlist`, {
        prodId,
      });
      console.log(response.data);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFilteredProducts = createAsyncThunk(
  "auth/getFilteredProducts",
  async (filterData, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    try {
      const response = await axios.post(
        `${base_url}product/get-filtered-products?${
          filterData?.brand ? `brand=${filterData?.brand}&&` : ""
        }${filterData?.category ? `category=${filterData?.category}&&` : ""}${
          filterData?.tag ? `tags=${filterData?.tag}&&` : ""
        }${filterData?.minPrice ? `price[gte]=${filterData?.minPrice}&&` : ""}${
          filterData?.maxPrice ? `price[lte]=${filterData?.maxPrice}&&` : ""
        }${filterData?.sort ? `sort=${filterData?.sort}&&` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.user?.token}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (searchData, thunkAPI) => {
    // const { token } = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.get(
        `${base_url}product/search/${searchData}`
      );
      console.log(response.data);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
      })
      .addCase(searchProducts.pending, (state, action) => {
        state.isLoding = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isSuccess = true;
        state.isError = false;
        state.searchProductsList = action.payload;
        state.message = "Search Product List";
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoding = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getFilteredProducts.pending, (state, action) => {
        state.isLoding = true;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isSuccess = true;
        state.isError = false;
        state.filterProductsList = action.payload;
        state.message = "Filter Product List";
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.isLoding = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
