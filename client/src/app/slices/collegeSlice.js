import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getColleges,
  addCollege,
  updateCollegeGeneral,
  updateCollegeOutreach,
  deleteCollege,
} from "../../services/collegeService";

// Thunks

export const fetchColleges = createAsyncThunk(
  "colleges/fetchColleges",
  async ({ token }, { getState, rejectWithValue }) => {
    try {
      const { filters, page } = getState().colleges;
      const data = await getColleges(token, filters, page);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addCollegeThunk = createAsyncThunk(
  "colleges/addCollege",
  async ({ token, collegeData }, { rejectWithValue }) => {
    try {
      const data = await addCollege(token, collegeData);
      return data; // Return the added college
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateCollegeGeneralThunk = createAsyncThunk(
  "colleges/updateCollegeGeneral",
  async ({ token, id, updateData }, { rejectWithValue }) => {
    try {
      await updateCollegeGeneral(token, id, updateData);
      return { id, updateData };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateCollegeOutreachThunk = createAsyncThunk(
  "colleges/updateCollegeOutreach",
  async ({ token, id, updateData }, { rejectWithValue }) => {
    try {
      const updatedCollege = await updateCollegeOutreach(token, id, updateData);
      return updatedCollege;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteCollegeThunk = createAsyncThunk(
  "colleges/deleteCollege",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      await deleteCollege(token, id); // call your API service to delete
      return id; // return deleted college id for reducer
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Initial State
const initialState = {
  colleges: [],
  users: [],
  filters: {
    search: "", 
    status: "", 
    assignedTo: "",
    location: "",
    createdBy: "",
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
const collegeSlice = createSlice({
  name: "colleges",
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
      // Fetch colleges
      .addCase(fetchColleges.pending, (state) => {
        state.loading.fetch = true;
        state.error = null;
      })
      .addCase(fetchColleges.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.colleges = action.payload.colleges;
        state.totalPages = action.payload.pages;
      })
      .addCase(fetchColleges.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error = action.payload || action.error.message;
      })

      // Add college
      .addCase(addCollegeThunk.pending, (state) => {
        state.loading.add = true;
        state.error = null;
      })
      .addCase(addCollegeThunk.fulfilled, (state, action) => {
        state.loading.add = false;
        // Only push if you're on page 1
        if (state.page === 1) {
          state.colleges.unshift(action.payload);
          // Optional: maintain max 20 items on first page
          if (state.colleges.length > 20) {
            state.colleges.pop();
          }
        }
      })

      .addCase(addCollegeThunk.rejected, (state, action) => {
        state.loading.add = false;
        state.error = action.payload || action.error.message;
      })

      // Update general
      .addCase(updateCollegeGeneralThunk.pending, (state) => {
        state.loading.updateGeneral = true;
        state.error = null;
      })
      .addCase(updateCollegeGeneralThunk.fulfilled, (state, action) => {
        state.loading.updateGeneral = false;
        const { id, updateData } = action.payload;
        const index = state.colleges.findIndex((college) => college._id === id);
        if (index !== -1) {
          state.colleges[index] = {
            ...state.colleges[index],
            ...updateData,
          };
        }
      })

      .addCase(updateCollegeGeneralThunk.rejected, (state, action) => {
        state.loading.updateGeneral = false;
        state.error = action.payload || action.error.message;
      })

      // Update outreach
      .addCase(updateCollegeOutreachThunk.pending, (state) => {
        state.loading.updateOutreach = true;
        state.error = null;
      })
      .addCase(updateCollegeOutreachThunk.fulfilled, (state, action) => {
        state.loading.updateOutreach = false;
        const updatedCollege = action.payload;
        const index = state.colleges.findIndex(c => c._id === updatedCollege._id);
        if (index !== -1) {
          state.colleges[index] = updatedCollege;
        }
      })

      .addCase(updateCollegeOutreachThunk.rejected, (state, action) => {
        state.loading.updateOutreach = false;
        state.error = action.payload || action.error.message;
      })


      // Delete college
      .addCase(deleteCollegeThunk.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(deleteCollegeThunk.fulfilled, (state, action) => {
        state.loading.delete = false;
        const deletedId = action.payload;
        state.colleges = state.colleges.filter(college => college._id !== deletedId);
      })
      .addCase(deleteCollegeThunk.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setFilters, setPage } = collegeSlice.actions;

export default collegeSlice.reducer;
