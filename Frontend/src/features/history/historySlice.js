import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getHistoryListingRequestsAPI,
  getHistoryOverviewAPI,
} from "./historyAPI";

export const fetchHistoryOverview = createAsyncThunk(
  "history/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getHistoryOverviewAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch history",
      );
    }
  },
);

export const fetchHistoryListingRequests = createAsyncThunk(
  "history/fetchListingRequests",
  async (listingId, { rejectWithValue }) => {
    try {
      const response = await getHistoryListingRequestsAPI(listingId);
      return { listingId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to fetch history requests for food post",
      );
    }
  },
);

const initialState = {
  historyRequests: [],
  historyFoodPosts: [],
  listingHistoryRequests: [],
  overviewLoading: false,
  listingHistoryLoading: false,
  overviewError: null,
  listingHistoryError: null,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoryOverview.pending, (state) => {
        state.overviewLoading = true;
        state.overviewError = null;
      })
      .addCase(fetchHistoryOverview.fulfilled, (state, action) => {
        state.overviewLoading = false;
        state.historyRequests = action.payload.requests || [];
        state.historyFoodPosts = action.payload.foodPosts || [];
      })
      .addCase(fetchHistoryOverview.rejected, (state, action) => {
        state.overviewLoading = false;
        state.overviewError = action.payload;
      })
      .addCase(fetchHistoryListingRequests.pending, (state) => {
        state.listingHistoryLoading = true;
        state.listingHistoryError = null;
      })
      .addCase(fetchHistoryListingRequests.fulfilled, (state, action) => {
        state.listingHistoryLoading = false;
        state.listingHistoryRequests = action.payload.requests || [];
      })
      .addCase(fetchHistoryListingRequests.rejected, (state, action) => {
        state.listingHistoryLoading = false;
        state.listingHistoryError = action.payload;
      });
  },
});

export default historySlice.reducer;