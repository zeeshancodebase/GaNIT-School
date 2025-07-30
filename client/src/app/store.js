import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import hrReducer from './slices/hrSlice';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
     hr: hrReducer,
  },
});
