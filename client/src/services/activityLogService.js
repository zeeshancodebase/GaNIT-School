// services/activityLogService.js
import axiosInstance from "../api/axios";

export const fetchActivityLogs = async (token, modelType, modelId) => {
  const res = await axiosInstance.get(`/api/activityLogs/${modelType}/${modelId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
