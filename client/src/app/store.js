import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import hrReducer from './slices/hrSlice';
import candidateReducer from './slices/candidateSlice';
import collegeReducer from "./slices/collegeSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    hr: hrReducer,
    candidate: candidateReducer,
    colleges: collegeReducer,
    users: userReducer,
  },
});
