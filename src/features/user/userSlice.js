import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { toast } from "react-toastify";
import { config } from "../../utils/axiosConfig";
/* 
const gerCustomerfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null; */

const initialState = {
  user: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}user/register`, userData);

      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}user/login`, userData);
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserProductWishlist = createAsyncThunk(
  "auth/getUserWishList",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}user/wishlist`, config);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const prodAddToCart = createAsyncThunk(
  "auth/prodAddToCart",
  async (cartProduct, thunkAPI) => {
    try {
      const response = await axios.post(
        `${base_url}user/userCart`,
        cartProduct,
        config
      );
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "auth/getUserCart",
  async (cartProduct, thunkAPI) => {
    try {
      const response = await axios.get(`${base_url}user/userCart`, config);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const UpdateQuantity = createAsyncThunk(
  "auth/UpdateQuantity",
  async (qutUpdate, thunkAPI) => {
    console.log(config);
    console.log(qutUpdate);
    try {
      const response = await axios.put(
        `${base_url}user/cartQtyUpdate/${qutUpdate?.cartItemId}`,
        qutUpdate,
        config
      );
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUsercart = createAsyncThunk(
  "auth/deleteUsercart",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${base_url}user/deleteUsercart/${id}`,
        config
      );
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.info("User Created Successfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        console.log(action.payload);
        if (state.isSuccess === true) {
          localStorage.setItem("token", JSON.stringify(action?.payload?.token));
          toast.info("User Logged In Successfully");
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getUserProductWishlist.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wishlist = action.payload;
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.wishlist = action.error;
      })
      .addCase(prodAddToCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(prodAddToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cartAddedProduct = action.payload;
        state.message = "Product added to Cart";
      })
      .addCase(prodAddToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getUserCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userCart = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(UpdateQuantity.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(UpdateQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.UpdatedQuantityProd = action.payload;
      })
      .addCase(UpdateQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteUsercart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteUsercart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedUserCart = action.payload;
        state.message = "Cart Item Deleted";
      })
      .addCase(deleteUsercart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
