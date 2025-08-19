import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import hrReducer from './slices/hrSlice';
import candidateReducer from './slices/candidateSlice';
import collegeReducer from "./slices/collegeSlice";
import userReducer from "./slices/userSlice";
import activityLogReducer from "./slices/activityLogSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    hr: hrReducer,
    candidates: candidateReducer,
    colleges: collegeReducer,
    users: userReducer,
    activityLogs: activityLogReducer,
  },
});
