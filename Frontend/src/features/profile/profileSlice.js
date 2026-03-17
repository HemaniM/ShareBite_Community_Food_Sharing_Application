import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyProfileAPI,
  updateMyProfileAPI,
  uploadProfileImageAPI,
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

export const uploadMyProfileImage = createAsyncThunk(
  "profile/uploadMyProfileImage",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await uploadProfileImageAPI(payload);
      return response.data.profileImage;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload profile image",
      );
    }
  },
);

const initialState = {
  profileData: null,
  loading: false,
  error: null,
  updateLoading: false,
  imageUploading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
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
      })
      .addCase(uploadMyProfileImage.pending, (state) => {
        state.imageUploading = true;
        state.error = null;
      })
      .addCase(uploadMyProfileImage.fulfilled, (state, action) => {
        state.imageUploading = false;
        if (!state.profileData) {
          state.profileData = {};
        }
        state.profileData.profileImage = action.payload;
      })
      .addCase(uploadMyProfileImage.rejected, (state, action) => {
        state.imageUploading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;
