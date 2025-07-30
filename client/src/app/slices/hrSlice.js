import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHRs, deleteHR, createHR, updateHR } from '../../services/hrServices';

// Thunks
export const fetchAllHRs = createAsyncThunk('hr/fetchAll', async () => {
  const data = await fetchHRs();
  return data;
});

export const removeHR = createAsyncThunk('hr/delete', async (id, { rejectWithValue }) => {
  try {
    await deleteHR(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addNewHR = createAsyncThunk('hr/create', async (formData) => {
  const data = await createHR(formData);
  return data;
});

export const editHR = createAsyncThunk('hr/update', async (hr) => {
  const data = await updateHR(hr);
  return data;
});

// Slice
const hrSlice = createSlice({
  name: 'hr',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHRs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllHRs.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllHRs.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(removeHR.fulfilled, (state, action) => {
        state.list = state.list.filter((hr) => hr._id !== action.payload);
      })
      .addCase(addNewHR.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editHR.fulfilled, (state, action) => {
        const index = state.list.findIndex((hr) => hr._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default hrSlice.reducer;
