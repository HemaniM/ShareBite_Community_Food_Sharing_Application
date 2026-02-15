import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileData: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profileData = action.payload;
    },

    clearProfile: (state) => {
      state.profileData = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
