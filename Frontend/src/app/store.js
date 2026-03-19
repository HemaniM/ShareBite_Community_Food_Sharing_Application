import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import listingsReducer from "../features/listings/listingsSlice";
import requestsReducer from "../features/requests/requestsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    listings: listingsReducer,
    requests: requestsReducer,
  },
});
