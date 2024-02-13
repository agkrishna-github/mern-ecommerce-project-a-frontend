import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const initialState = {
  enquiries: [],
  isLoding: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createEnquiry = createAsyncThunk(
  "enquiry/createEnquiry",
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}enquiry/`, contact);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEnquiry.pending, (state, action) => {
        state.isLoding = true;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdEnquiry = action.payload;
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.isLoding = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default enquirySlice.reducer;
