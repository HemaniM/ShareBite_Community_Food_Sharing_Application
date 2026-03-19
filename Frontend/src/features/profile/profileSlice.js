import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyProfileAPI,
  getPublicProfileAPI,
  updateMyProfileAPI,
} from "./profileAPI";

export const fetchMyProfile = createAsyncThunk(
  "profile/fetchMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyProfileAPI();
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

export const fetchPublicProfileById = createAsyncThunk(
  "profile/fetchPublicProfileById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getPublicProfileAPI(userId);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user profile",
      );
    }
  },
);

export const updateMyProfile = createAsyncThunk(
  "profile/updateMyProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateMyProfileAPI(payload);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

const initialState = {
  profileData: null,
  loading: false,
  error: null,
  updateLoading: false,
  userProfile: null,
  userProfileLoading: false,
  userProfileError: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
      state.userProfileError = null;
      state.userProfileLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPublicProfileById.pending, (state) => {
        state.userProfileLoading = true;
        state.userProfileError = null;
      })
      .addCase(fetchPublicProfileById.fulfilled, (state, action) => {
        state.userProfileLoading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchPublicProfileById.rejected, (state, action) => {
        state.userProfileLoading = false;
        state.userProfileError = action.payload;
      })
      .addCase(updateMyProfile.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.profileData = action.payload;
      })
      .addCase(updateMyProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileError, clearUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
