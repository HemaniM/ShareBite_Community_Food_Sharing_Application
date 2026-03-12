import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createListingAPI, getMyListingsAPI } from "./listingsAPI";

export const createListing = createAsyncThunk(
  "listings/createListing",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createListingAPI(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to create food post"
      );
    }
  }
);

export const fetchMyListings = createAsyncThunk(
  "listings/fetchMyListings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyListingsAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch your food posts"
      );
    }
  }
);

const initialState = {
  myListings: [],
  loading: false,
  createLoading: false,
  error: null,
  createSuccess: false,
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    resetCreateListingState: (state) => {
      state.createLoading = false;
      state.createSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createListing.pending, (state) => {
        state.createLoading = true;
        state.createSuccess = false;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
        state.error = null;
        state.myListings = [action.payload.listing, ...state.myListings];
      })
      .addCase(createListing.rejected, (state, action) => {
        state.createLoading = false;
        state.createSuccess = false;
        state.error = action.payload;
      })
      .addCase(fetchMyListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyListings.fulfilled, (state, action) => {
        state.loading = false;
        state.myListings = action.payload.listings || [];
      })
      .addCase(fetchMyListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateListingState } = listingsSlice.actions;
export default listingsSlice.reducer;