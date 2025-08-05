import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCandidates,
  deleteCandidate,
  createCandidate,
  updateCandidate,
  updateCandidateStatusOrNote
} from '../../services/candidateService';


// Fetch all candidates
export const fetchAllCandidates = createAsyncThunk(
  'candidate/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCandidates();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a candidate
export const removeCandidate = createAsyncThunk(
  'candidate/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteCandidate(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add a candidate
export const addNewCandidate = createAsyncThunk(
  'candidate/create',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await createCandidate(formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Edit a candidate
export const editCandidate = createAsyncThunk(
  'candidate/update',
  async (candidate, { rejectWithValue }) => {
    try {
      const data = await updateCandidate(candidate);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Update candidate status or note
export const updateCandidateStatus = createAsyncThunk(
  'candidate/updateStatusOrNote',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const data = await updateCandidateStatusOrNote(id, updateData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Initial state
const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

// Slice
const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    clearCandidateError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAllCandidates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCandidates.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllCandidates.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      // Delete
      .addCase(removeCandidate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeCandidate.fulfilled, (state, action) => {
        state.list = state.list.filter(candidate => candidate._id !== action.payload);
        state.isLoading = false;
      })
      .addCase(removeCandidate.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      // Create
      .addCase(addNewCandidate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewCandidate.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addNewCandidate.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      // Update
      .addCase(editCandidate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editCandidate.fulfilled, (state, action) => {
        const index = state.list.findIndex(candidate => candidate._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(editCandidate.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })


      // Update status/note
      .addCase(updateCandidateStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCandidateStatus.fulfilled, (state, action) => {
        const index = state.list.findIndex(candidate => candidate._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(updateCandidateStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });


  }
});

// Exports
export const { clearCandidateError } = candidateSlice.actions;
export default candidateSlice.reducer;
