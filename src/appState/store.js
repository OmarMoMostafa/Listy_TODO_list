import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    notification: notificationReducer,
  },
});
