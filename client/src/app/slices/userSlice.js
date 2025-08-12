import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "../../services/userService";
import { toast } from "react-toastify";

// Thunks

// export const registerUserThunk = createAsyncThunk(
//   "users/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const data = await userService.registerUser(userData);
//       toast.success("User registered successfully");
//       return data;
//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message);
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );




export const fetchAllUsersThunk = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {  
    try {
      const data = await userService.getAllUsers();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// export const fetchAllHRsThunk = createAsyncThunk(
//   "users/fetchHRs",
//   async (token, { rejectWithValue }) => {
//     try {
//       const data = await userService.getAllHRs(token);
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

export const fetchUserByIdThunk = createAsyncThunk(
  "users/fetchById",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const data = await userService.getUserById(token, id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "users/update",
  async ({ token, id, updateData }, { rejectWithValue, dispatch }) => {
    try {
      const data = await userService.updateUser(token, id, updateData);
      toast.success("User updated");
      dispatch(fetchAllUsersThunk(token));
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  "users/delete",
  async ({ token, id }, { rejectWithValue, dispatch }) => {
    try {
      await userService.deleteUser(token, id);
      toast.success("User deleted");
      dispatch(fetchAllUsersThunk(token));
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Initial state
const initialState = {
  user: null,
  users: [],
  hrs: [],
  loading: false,
  error: null,
};

// Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
    //   .addCase(registerUserThunk.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(registerUserThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.user = action.payload.user;
    //   })
    //   .addCase(registerUserThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

      // Login
    
      // Get current user
      //to be added or handled by auth.jsx 

      // Get all users
      .addCase(fetchAllUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get all HRs
    //   .addCase(fetchAllHRsThunk.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchAllHRsThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.hrs = action.payload;
    //   })
    //   .addCase(fetchAllHRsThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

      // Fetch user by id
      .addCase(fetchUserByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        // Could store single fetched user if needed
      })
      .addCase(fetchUserByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
