// services/jobService.js
import axiosInstance from "../api/axios";

// Fetch all jobs
export const fetchJobs = async () => {
 try {
    const response = await axiosInstance.get("/api/jobs");
    // console.log("Fetched jobs from API:", response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    return [];
  }
};

// Create a new job
export const createJob = async (job) => {
  const response = await axiosInstance.post("/api/jobs/createJob", job); 
  return response.data;
};

// Update an existing job
export const updateJob = async (job) => {
  const response = await axiosInstance.put(`/api/jobs/${job.id}`, job);
  return response.data;
};

// Delete a job
export const deleteJob = async (id) => {
  const response = await axiosInstance.delete(`/api/jobs/${id}`);
  return response.data;
};
