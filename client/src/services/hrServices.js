// services/hrService.js
import axiosInstance from "../api/axios";

// Get all HRs
export const fetchHRs = async () => {
  const response = await axiosInstance.get("/api/user/getAllUsers");
  return response.data;
};

// Create new HR
export const createHR = async (formData) => {
  const response = await axiosInstance.post("/api/user/register", formData);
  return response.data;
};

// Update HR
export const updateHR = async (hr) => {
  const response = await axiosInstance.put(`/api/user/${hr.id}`, hr);
  return response.data;
};

// Delete HR
export const deleteHR = async (id) => {
  const response = await axiosInstance.delete(`/api/user/${id}`);
  return response.data;
};
