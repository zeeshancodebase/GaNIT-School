// services/activityLogService.js
import axiosInstance from "../api/axios";

export const fetchActivityLogs = async (token, modelType, modelId) => {
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch all logs (Admin Dashboard)
  if (!modelType || !modelId) {
    const res = await axiosInstance.get(`/api/activityLogs`, { headers });
    return res.data;
  }

  // Fetch specific logs
  const res = await axiosInstance.get(`/api/activityLogs/${modelType}/${modelId}`, { headers });
  return res.data;
};
