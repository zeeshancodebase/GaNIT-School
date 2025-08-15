import axiosInstance from "../api/axios";

// Get all colleges with filters and pagination
export const getColleges = async (token, filters, page) => {
  const params = { ...filters, page, limit: 20 };
  const res = await axiosInstance.get("/api/colleges", {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Add a new college
export const addCollege = async (token, collegeData) => {
  const res = await axiosInstance.post("/api/colleges/addCollege", collegeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update general details of a college
export const updateCollegeGeneral = async (token, id, updateData) => {
  const res = await axiosInstance.patch(`/api/colleges/${id}/general`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update outreach details of a college
export const updateCollegeOutreach = async (token, id, updateData) => {
  const res = await axiosInstance.patch(`/api/colleges/${id}/outreach`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete a college
export const deleteCollege = async (token, id) => {
  const res = await axiosInstance.delete(`/api/colleges/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Fetch activity logs for a specific college
export const fetchLogs = async (token, collegeId) => {
  const res = await axiosInstance.get(`/api/colleges/${collegeId}/logs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get users (unchanged, but included for completeness)
export const getUsers = async (token) => {
  const res = await axiosInstance.get("/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
