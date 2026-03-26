import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import listingsReducer from "../features/listings/listingsSlice";
import requestsReducer from "../features/requests/requestsSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import historyReducer from "../features/history/historySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    listings: listingsReducer,
    requests: requestsReducer,
    reviews: reviewsReducer,
    history: historyReducer,
  },
});
