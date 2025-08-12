import axiosInstance from "../api/axios";

// All functions receive token as first param if protected

export const getColleges = async (token, filters, page) => {
  const params = { ...filters, page, limit: 20 };
  const res = await axiosInstance.get("/api/colleges", {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addCollege = async (token, collegeData) => {
  const res = await axiosInstance.post("/api/colleges/addCollege", collegeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateCollege = async (token, id, updateData) => {
  const res = await axiosInstance.put(`/api/colleges/${id}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUsers = async (token) => {
  const res = await axiosInstance.get("/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


export const fetchLogs = async (token, collegeId) => {
  const res = await axiosInstance.get(`/api/colleges/${collegeId}/logs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};