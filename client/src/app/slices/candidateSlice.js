import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCandidates,
  addCandidate,
  updateCandidateGeneral,
  updateCandidateOutreach,
  deleteCandidate,
} from "../../services/candidateService";

// Thunks

// Fetch candidates with filters and pagination
export const fetchCandidatesThunk = createAsyncThunk(
  "candidates/fetchCandidates",
  async ({ token }, { getState, rejectWithValue }) => {
    try {
      const { filters, page } = getState().candidates;
      const data = await fetchCandidates(token, filters, page);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add a new candidate
export const addCandidateThunk = createAsyncThunk(
  "candidates/addCandidate",
  async ({ candidateData }, { rejectWithValue }) => {
    try {
      const data = await addCandidate(candidateData);
      return data; // Return the added candidate
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update general details of a candidate
export const updateCandidateGeneralThunk = createAsyncThunk(
  "candidates/updateCandidateGeneral",
  async ({ token, id, updateData }, { rejectWithValue }) => {
    try {
      const updatedCandidate = await updateCandidateGeneral(token, id, updateData);
      return updatedCandidate;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update outreach details of a candidate
export const updateCandidateOutreachThunk = createAsyncThunk(
  "candidates/updateCandidateOutreach",
  async ({ token, id, updateData }, { rejectWithValue }) => {
    try {
      const updatedCandidate = await updateCandidateOutreach(token, id, updateData);
      return updatedCandidate;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete a candidate
export const deleteCandidateThunk = createAsyncThunk(
  "candidates/deleteCandidate",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      await deleteCandidate(token, id); // call your API service to delete
      return id; // return deleted candidate id for reducer
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Initial State
const initialState = {
  candidates: [],
  users: [],
  filters: {
    search: "",
    status: "",
    assignedTo: "",
    location: "",
    followUpStartDate: "",
    followUpEndDate: "",
  },
  page: 1,
  totalPages: 1,
  loading: {
    fetch: false,
    add: false,
    updateGeneral: false,
    updateOutreach: false,
    delete: false,
  },
  error: null,
};

// Slice
const candidateSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch candidates
      .addCase(fetchCandidatesThunk.pending, (state) => {
        state.loading.fetch = true;
        state.error = null;
      })
      .addCase(fetchCandidatesThunk.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.candidates = action.payload.candidates;
        state.totalPages = action.payload.pages;
      })
      .addCase(fetchCandidatesThunk.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error = action.payload || action.error.message;
      })

      // Add candidate
      .addCase(addCandidateThunk.pending, (state) => {
        state.loading.add = true;
        state.error = null;
      })
      .addCase(addCandidateThunk.fulfilled, (state, action) => {
        state.loading.add = false;
        if (state.page === 1) {
          state.candidates.unshift(action.payload);
          if (state.candidates.length > 20) {
            state.candidates.pop();
          }
        }
      })
      .addCase(addCandidateThunk.rejected, (state, action) => {
        state.loading.add = false;
        state.error = action.payload || action.error.message;
      })

      // Update general details
      .addCase(updateCandidateGeneralThunk.pending, (state) => {
        state.loading.updateGeneral = true;
        state.error = null;
      })
      .addCase(updateCandidateGeneralThunk.fulfilled, (state, action) => {
        const updatedCandidate = action.payload;
        const index = state.candidates.findIndex((candidate) => candidate._id === updatedCandidate._id);
        if (index !== -1) {
          state.candidates[index] = updatedCandidate;
        }
      })
      .addCase(updateCandidateGeneralThunk.rejected, (state, action) => {
        state.loading.updateGeneral = false;
        state.error = action.payload || action.error.message;
      })

      // Update outreach details
      .addCase(updateCandidateOutreachThunk.pending, (state) => {
        state.loading.updateOutreach = true;
        state.error = null;
      })
      .addCase(updateCandidateOutreachThunk.fulfilled, (state, action) => {
        state.loading.updateOutreach = false;
        const updatedCandidate = action.payload;
        const index = state.candidates.findIndex((candidate) => candidate._id === updatedCandidate._id);
        if (index !== -1) {
          state.candidates[index] = updatedCandidate;
        }
      })
      .addCase(updateCandidateOutreachThunk.rejected, (state, action) => {
        state.loading.updateOutreach = false;
        state.error = action.payload || action.error.message;
      })

      // Delete candidate
      .addCase(deleteCandidateThunk.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(deleteCandidateThunk.fulfilled, (state, action) => {
        state.loading.delete = false;
        const deletedId = action.payload;
        state.candidates = state.candidates.filter(candidate => candidate._id !== deletedId);
      })
      .addCase(deleteCandidateThunk.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setFilters, setPage } = candidateSlice.actions;

export default candidateSlice.reducer;
