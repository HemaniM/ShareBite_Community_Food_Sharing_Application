import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createReviewAPI, getDonorReviewsAPI } from "./reviewsAPI";

export const fetchDonorReviews = createAsyncThunk(
  "reviews/fetchDonorReviews",
  async ({ donorId, listingId }, { rejectWithValue }) => {
    try {
      const response = await getDonorReviewsAPI(donorId, listingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch donor reviews",
      );
    }
  },
);

export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createReviewAPI(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to submit review",
      );
    }
  },
);

const initialState = {
  donorReviews: [],
  donorReviewsLoading: false,
  donorReviewsError: null,
  donorAverageRating: 0,
  donorTotalReviews: 0,
  submitLoading: false,
  submitError: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviewFeedback: (state) => {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonorReviews.pending, (state) => {
        state.donorReviewsLoading = true;
        state.donorReviewsError = null;
      })
      .addCase(fetchDonorReviews.fulfilled, (state, action) => {
        state.donorReviewsLoading = false;
        state.donorReviews = action.payload.reviews || [];
        state.donorAverageRating = Number(action.payload.averageRating || 0);
        state.donorTotalReviews = Number(action.payload.totalReviews || 0);
      })
      .addCase(fetchDonorReviews.rejected, (state, action) => {
        state.donorReviewsLoading = false;
        state.donorReviewsError = action.payload;
      })
      .addCase(submitReview.pending, (state) => {
        state.submitLoading = true;
        state.submitError = null;
      })
      .addCase(submitReview.fulfilled, (state) => {
        state.submitLoading = false;
        state.submitError = null;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.submitLoading = false;
        state.submitError = action.payload;
      });
  },
});

export const { clearReviewFeedback } = reviewsSlice.actions;
export default reviewsSlice.reducer;