// store/slices/jobSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchJobs, createJob, updateJob, deleteJob, closeJob, reopenJob, fetchJobByJobId } from '../../services/jobService';

// Async thunks
// export const fetchJobsAsync = createAsyncThunk('jobs/fetchJobs', async () => {
//   const jobs = await fetchJobs();
//   return jobs;
// });

// export const fetchJobsAsync = createAsyncThunk(
//   'jobs/fetchJobs',
//   async () => {
//     const data = await fetchJobs();
//     const now = new Date();
//     const NEW_DAYS = 7;

//     return data.map((job) => {
//       const createdAt = new Date(job.createdAt);
//       const ageInDays = (now - createdAt) / (1000 * 60 * 60 * 24);
//       return {
//         ...job,
//         isNew: ageInDays < NEW_DAYS,
//       };
//     });
//   }
// );

export const fetchJobsAsync = createAsyncThunk(
  'jobs/fetchJobs',
  async () => {
    const data = await fetchJobs();
    const now = new Date();
    const NEW_DAYS = 7;

    return data
      .map((job) => {
        const createdAt = new Date(job.createdAt);
        const ageInDays = (now - createdAt) / (1000 * 60 * 60 * 24);
        return {
          ...job,
          isNew: ageInDays < NEW_DAYS,
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // NEWEST FIRST
  }
);

export const fetchJobByJobIdAsync = createAsyncThunk(
  'jobs/fetchJobByJobId',
  async (jobId) => {
    const job = await fetchJobByJobId(jobId);
    return job;
  }
);


export const createJobAsync = createAsyncThunk('jobs/createJob', async (jobData) => {
  const job = await createJob(jobData);
  return job;
});

export const updateJobAsync = createAsyncThunk('jobs/updateJob', async (jobData) => {
  const updatedJob = await updateJob(jobData);
  return updatedJob;
});

export const deleteJobAsync = createAsyncThunk('jobs/deleteJob', async (jobId) => {
  await deleteJob(jobId);
  return jobId;
});

export const closeJobAsync = createAsyncThunk(
  'jobs/closeJob',
  async (jobId) => {
    const closedJob = await closeJob(jobId);
    return closedJob;
  }
);

export const reopenJobAsync = createAsyncThunk(
  'jobs/reopenJob',
  async (jobId) => {
    const reopenedJob = await reopenJob(jobId);
    return reopenedJob;
  }
);

// Create the jobSlice
const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Jobs
      .addCase(fetchJobsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobsAsync.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchJobsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })


      // Fetch single job by jobId
      .addCase(fetchJobByJobIdAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobByJobIdAsync.fulfilled, (state, action) => {
        state.selectedJob = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchJobByJobIdAsync.rejected, (state, action) => {
        state.selectedJob = null;
        state.isLoading = false;
        state.error = action.error.message;
      })


      // Create Job
      .addCase(createJobAsync.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
        state.isLoading = false;
      })

      // Update Job
      .addCase(updateJobAsync.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(job => job._id === action.payload._id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })

      // Delete Job
      .addCase(deleteJobAsync.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(job => job._id !== action.payload);
      })

      // Close Job
      .addCase(closeJobAsync.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(job => job._id === action.payload._id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })

      // Re-Open Job
      .addCase(reopenJobAsync.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(job => job._id === action.payload._id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })


  },
});

export default jobSlice.reducer;
