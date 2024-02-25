import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const initialState = {
  homeDetails: [],
  homeSubDetails: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getHomepageDetails = createAsyncThunk(
  "homepage/getHomepageDetails",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${base_url}homepage/getHomePagedetails`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getHomepageSubDetails = createAsyncThunk(
  "homepage/getHomepageSubDetails",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `${base_url}homepage/get-Home-page-SubDetails`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const homePageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomepageDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getHomepageDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.homeDetails = action.payload;
      })
      .addCase(getHomepageDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getHomepageSubDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getHomepageSubDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.homeSubDetails = action.payload;
      })
      .addCase(getHomepageSubDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default homePageSlice.reducer;
