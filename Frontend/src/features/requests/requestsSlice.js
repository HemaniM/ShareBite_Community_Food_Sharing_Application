import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  acceptRequestAPI,
  createRequestAPI,
  getMyRequestsAPI,
  getRequestsForListingAPI,
  rejectRequestAPI,
} from "./requestsAPI";
import { submitReview } from "../reviews/reviewsSlice";

export const createRequest = createAsyncThunk(
  "requests/createRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createRequestAPI(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to place request",
      );
    }
  },
);

export const fetchMyRequests = createAsyncThunk(
  "requests/fetchMyRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyRequestsAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch your requests",
      );
    }
  },
);

export const fetchRequestsForListing = createAsyncThunk(
  "requests/fetchRequestsForListing",
  async (listingId, { rejectWithValue }) => {
    try {
      const response = await getRequestsForListingAPI(listingId);
      return { listingId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to fetch requests for food post",
      );
    }
  },
);

export const acceptRequest = createAsyncThunk(
  "requests/acceptRequest",
  async ({ requestId, listingId }, { rejectWithValue }) => {
    try {
      const response = await acceptRequestAPI(requestId);
      return { listingId, requestId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to accept request",
      );
    }
  },
);

export const rejectRequest = createAsyncThunk(
  "requests/rejectRequest",
  async ({ requestId, listingId }, { rejectWithValue }) => {
    try {
      const response = await rejectRequestAPI(requestId);
      return { listingId, requestId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to reject request",
      );
    }
  },
);

const initialState = {
  myRequests: [],
  listingRequests: [],
  myRequestsLoading: false,
  listingRequestsLoading: false,
  createLoading: false,
  acceptLoading: false,
  rejectLoading: false,
  createError: null,
  myRequestsError: null,
  listingRequestsError: null,
  acceptError: null,
  rejectError: null,
  createSuccessMessage: "",
};

const mergeUpdatedRequest = (requests, updatedRequest) =>
  requests.map((request) =>
    request._id === updatedRequest?._id
      ? {
          ...request,
          ...updatedRequest,
        }
      : request,
  );

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    clearRequestFeedback: (state) => {
      state.createError = null;
      state.acceptError = null;
      state.rejectError = null;
      state.createSuccessMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRequest.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.createSuccessMessage = "";
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createError = null;
        state.createSuccessMessage =
          action.payload.message || "Request placed successfully";
        if (action.payload.request) {
          state.myRequests = [action.payload.request, ...state.myRequests];
        }
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      })
      .addCase(fetchMyRequests.pending, (state) => {
        state.myRequestsLoading = true;
        state.myRequestsError = null;
      })
      .addCase(fetchMyRequests.fulfilled, (state, action) => {
        state.myRequestsLoading = false;
        state.myRequests = action.payload.requests || [];
      })
      .addCase(fetchMyRequests.rejected, (state, action) => {
        state.myRequestsLoading = false;
        state.myRequestsError = action.payload;
      })
      .addCase(fetchRequestsForListing.pending, (state) => {
        state.listingRequestsLoading = true;
        state.listingRequestsError = null;
      })
      .addCase(fetchRequestsForListing.fulfilled, (state, action) => {
        state.listingRequestsLoading = false;
        state.listingRequests = action.payload.requests || [];
      })
      .addCase(fetchRequestsForListing.rejected, (state, action) => {
        state.listingRequestsLoading = false;
        state.listingRequestsError = action.payload;
      })
      .addCase(acceptRequest.pending, (state) => {
        state.acceptLoading = true;
        state.acceptError = null;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.acceptLoading = false;
        state.acceptError = null;
        state.listingRequests = mergeUpdatedRequest(
          state.listingRequests,
          action.payload.approvedRequest,
        ).map((request) => {
          if (
            request._id !== action.payload.approvedRequest?._id &&
            request.status === "pending"
          ) {
            return {
              ...request,
              status: "rejected",
              donorToastMessage:
                action.payload.toastNotificationForOtherRequesters,
            };
          }

         return request;
        });
        state.myRequests = mergeUpdatedRequest(
          state.myRequests,
          action.payload.approvedRequest,
        ).map((request) => {
          if (
            request._id !== action.payload.approvedRequest?._id &&
            request.status === "pending" &&
            String(request.listingId?._id || request.listingId) ===
              String(action.payload.listingId)
          ) {
            return {
              ...request,
              status: "rejected",
              donorToastMessage:
                action.payload.toastNotificationForOtherRequesters,
            };
          }

          return request;
        });
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.acceptLoading = false;
        state.acceptError = action.payload;
      })
      .addCase(rejectRequest.pending, (state) => {
        state.rejectLoading = true;
        state.rejectError = null;
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.rejectLoading = false;
        state.rejectError = null;
        state.listingRequests = mergeUpdatedRequest(
          state.listingRequests,
          action.payload.rejectedRequest,
        );
        state.myRequests = mergeUpdatedRequest(
          state.myRequests,
          action.payload.rejectedRequest,
        );
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        state.rejectLoading = false;
        state.rejectError = action.payload;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        const review = action.payload.review;
        if (!review) {
          return;
        }

        state.myRequests = state.myRequests.map((request) =>
          String(request._id) === String(review.request)
            ? {
                ...request,
                review,
              }
            : request,
        );
      });
  },
});

export const { clearRequestFeedback } = requestsSlice.actions;
export default requestsSlice.reducer;
