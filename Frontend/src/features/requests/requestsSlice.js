import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  acceptRequestAPI,
  createRequestAPI,
  getMyRequestsAPI,
  getRequestsForListingAPI,
} from "./requestsAPI";

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

const initialState = {
  myRequests: [],
  listingRequests: [],
  myRequestsLoading: false,
  listingRequestsLoading: false,
  createLoading: false,
  acceptLoading: false,
  createError: null,
  myRequestsError: null,
  listingRequestsError: null,
  acceptError: null,
  createSuccessMessage: "",
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    clearRequestFeedback: (state) => {
      state.createError = null;
      state.acceptError = null;
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
        const approvedRequestId = action.payload.approvedRequest?._id;
        state.listingRequests = state.listingRequests.map((request) => {
          if (request._id === approvedRequestId) {
            return {
              ...request,
              ...action.payload.approvedRequest,
            };
          }

          if (
            request.listingId === action.payload.listingId &&
            request._id !== approvedRequestId &&
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

        state.myRequests = state.myRequests.map((request) => {
          if (request._id === approvedRequestId) {
            return {
              ...request,
              ...action.payload.approvedRequest,
            };
          }

          if (
            request.listingId?._id === action.payload.listingId &&
            request._id !== approvedRequestId &&
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
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.acceptLoading = false;
        state.acceptError = action.payload;
      });
  },
});

export const { clearRequestFeedback } = requestsSlice.actions;
export default requestsSlice.reducer;
