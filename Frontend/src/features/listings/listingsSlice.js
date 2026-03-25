import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createListingAPI,
  deleteMyListingAPI,
  getActiveListingsAPI,
  getFoodNearYouListingsAPI,
  getHomepageFilteredListingsAPI,
  getMostTrustedDonorListingsAPI,
  getMyListingsAPI,
  getRecentlyUploadedListingsAPI,
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

export const fetchFoodNearYouListings = createAsyncThunk(
  "listings/fetchFoodNearYouListings",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getFoodNearYouListingsAPI(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch food near you",
      );
    }
  },
);

export const fetchRecentlyUploadedListings = createAsyncThunk(
  "listings/fetchRecentlyUploadedListings",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getRecentlyUploadedListingsAPI(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch recently uploaded food",
      );
    }
  },
);

export const fetchHomepageFilteredListings = createAsyncThunk(
  "listings/fetchHomepageFilteredListings",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getHomepageFilteredListingsAPI(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch filtered food posts",
      );
    }
  },
);

export const fetchMostTrustedDonorListings = createAsyncThunk(
  "listings/fetchMostTrustedDonorListings",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await getMostTrustedDonorListingsAPI(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to fetch most trusted donor food posts",
      );
    }
  },
);


// /////////////////////////////

const initialState = {
  myListings: [],
  activeListings: [],
  foodNearYouListings: [],
  recentlyUploadedListings: [],
  mostTrustedDonorListings: [],
  homepageFilteredListings: [],
  foodNearYouMeta: {
    totalCount: 0,
    matchedCount: 0,
  },
  recentlyUploadedMeta: {
    totalCount: 0,
    matchedCount: 0,
  },
  mostTrustedDonorMeta: {
    totalCount: 0,
    matchedCount: 0,
  },
  homepageFilteredMeta: {
    totalCount: 0,
    matchedCount: 0,
  },
  loading: false,
  activeListingsLoading: false,
  foodNearYouLoading: false,
  recentlyUploadedLoading: false,
  mostTrustedDonorLoading: false,
  homepageFilteredLoading: false,
  createLoading: false,
  deleteLoading: false,
  error: null,
  activeListingsError: null,
  foodNearYouError: null,
  recentlyUploadedError: null,
  mostTrustedDonorError: null,
  homepageFilteredError: null,
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
      })
      .addCase(fetchFoodNearYouListings.pending, (state) => {
        state.foodNearYouLoading = true;
        state.foodNearYouError = null;
      })
      .addCase(fetchFoodNearYouListings.fulfilled, (state, action) => {
        state.foodNearYouLoading = false;
        state.foodNearYouError = null;
        state.foodNearYouListings = action.payload.listings || [];
        state.foodNearYouMeta = {
          totalCount: Number(action.payload.totalCount || 0),
          matchedCount: Number(action.payload.matchedCount || 0),
        };
      })
      .addCase(fetchFoodNearYouListings.rejected, (state, action) => {
        state.foodNearYouLoading = false;
        state.foodNearYouError = action.payload;
      })
      .addCase(fetchRecentlyUploadedListings.pending, (state) => {
        state.recentlyUploadedLoading = true;
        state.recentlyUploadedError = null;
      })
      .addCase(fetchRecentlyUploadedListings.fulfilled, (state, action) => {
        state.recentlyUploadedLoading = false;
        state.recentlyUploadedError = null;
        state.recentlyUploadedListings = action.payload.listings || [];
        state.recentlyUploadedMeta = {
          totalCount: Number(action.payload.totalCount || 0),
          matchedCount: Number(action.payload.matchedCount || 0),
        };
      })
      .addCase(fetchRecentlyUploadedListings.rejected, (state, action) => {
        state.recentlyUploadedLoading = false;
        state.recentlyUploadedError = action.payload;
      })
      .addCase(fetchMostTrustedDonorListings.pending, (state) => {
        state.mostTrustedDonorLoading = true;
        state.mostTrustedDonorError = null;
      })
      .addCase(fetchMostTrustedDonorListings.fulfilled, (state, action) => {
        state.mostTrustedDonorLoading = false;
        state.mostTrustedDonorError = null;
        state.mostTrustedDonorListings = action.payload.listings || [];
        state.mostTrustedDonorMeta = {
          totalCount: Number(action.payload.totalCount || 0),
          matchedCount: Number(action.payload.matchedCount || 0),
        };
      })
      .addCase(fetchMostTrustedDonorListings.rejected, (state, action) => {
        state.mostTrustedDonorLoading = false;
        state.mostTrustedDonorError = action.payload;
      })
      .addCase(fetchHomepageFilteredListings.pending, (state) => {
        state.homepageFilteredLoading = true;
        state.homepageFilteredError = null;
      })
      .addCase(fetchHomepageFilteredListings.fulfilled, (state, action) => {
        state.homepageFilteredLoading = false;
        state.homepageFilteredError = null;
        state.homepageFilteredListings = action.payload.listings || [];
        state.homepageFilteredMeta = {
          totalCount: Number(action.payload.totalCount || 0),
          matchedCount: Number(action.payload.matchedCount || 0),
        };
      })
      .addCase(fetchHomepageFilteredListings.rejected, (state, action) => {
        state.homepageFilteredLoading = false;
        state.homepageFilteredError = action.payload;
      });
  },
});

export const { resetCreateListingState } = listingsSlice.actions;
export default listingsSlice.reducer;
