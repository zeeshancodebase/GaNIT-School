import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchActivityLogs } from "../../services/activityLogService";

export const fetchActivityLogsThunk = createAsyncThunk(
  "activityLogs/fetch",
  async ({ token, modelType, modelId }, { rejectWithValue }) => {
    try {
      const data = await fetchActivityLogs(token, modelType, modelId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const activityLogSlice = createSlice({
  name: "activityLogs",
  initialState: {
    logs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearLogs(state) {
      state.logs = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityLogsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityLogsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(fetchActivityLogsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLogs } = activityLogSlice.actions;
export default activityLogSlice.reducer;
