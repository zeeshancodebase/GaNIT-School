import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getColleges,
  addCollege,
  updateCollege,
} from "../../services/collegeService";
import { toast } from "react-toastify";

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
  async ({ token, collegeData }, { dispatch, rejectWithValue }) => {
    try {
      const data = await addCollege(token, collegeData);
      toast.success("College added");
      dispatch(fetchColleges({ token }));
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateCollegeThunk = createAsyncThunk(
  "colleges/updateCollege",
  async ({ token, id, field, value }, { dispatch, rejectWithValue }) => {
    try {
      await updateCollege(token, id, { [field]: value });
      toast.success("Updated successfully");
      dispatch(fetchColleges({ token }));
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Initial State
const initialState = {
  colleges: [],
  users: [],
  filters: { search: "", status: "" },
  page: 1,
  totalPages: 1,
  loading: false,
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
      .addCase(fetchColleges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColleges.fulfilled, (state, action) => {
        state.loading = false;
        state.colleges = action.payload.colleges;
        state.totalPages = action.payload.pages;
      })
      .addCase(fetchColleges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })


      .addCase(addCollegeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCollegeThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCollegeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(updateCollegeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCollegeThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCollegeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setFilters, setPage } = collegeSlice.actions;

export default collegeSlice.reducer;
