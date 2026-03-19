import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createListingAPI,
  deleteMyListingAPI,
  getActiveListingsAPI,
  getMyListingsAPI,
} from "./listingsAPI";

export const createListing = createAsyncThunk(
  "listings/createListing",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createListingAPI(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to create food post",
      );
    }
  },
);

export const deleteMyListing = createAsyncThunk(
  "listings/deleteMyListing",
  async (listingId, { rejectWithValue }) => {
    try {
      const response = await deleteMyListingAPI(listingId);
      return { listingId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to delete food post",
      );
    }
  },
);

export const fetchMyListings = createAsyncThunk(
  "listings/fetchMyListings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyListingsAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch your food posts",
      );
    }
  },
);

export const fetchActiveListings = createAsyncThunk(
  "listings/fetchActiveListings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActiveListingsAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch available food posts",
      );
    }
  },
);

const initialState = {
  myListings: [],
  activeListings: [],
  loading: false,
  activeListingsLoading: false,
  createLoading: false,
  deleteLoading: false,
  error: null,
  activeListingsError: null,
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
      .addCase(deleteMyListing.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteMyListing.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.error = null;
        state.myListings = state.myListings.filter(
          (listing) => listing._id !== action.payload.listingId,
        );
      })
      .addCase(deleteMyListing.rejected, (state, action) => {
        state.deleteLoading = false;
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
       })
      .addCase(fetchActiveListings.pending, (state) => {
        state.activeListingsLoading = true;
        state.activeListingsError = null;
      })
      .addCase(fetchActiveListings.fulfilled, (state, action) => {
        state.activeListingsLoading = false;
        state.activeListings = action.payload.listings || [];
      })
      .addCase(fetchActiveListings.rejected, (state, action) => {
        state.activeListingsLoading = false;
        state.activeListingsError = action.payload;
      });
  },
});

export const { resetCreateListingState } = listingsSlice.actions;
export default listingsSlice.reducer;
