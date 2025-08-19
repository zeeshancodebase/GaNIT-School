import axiosInstance from "../api/axios";

// Get all candidates with filters and pagination
export const fetchCandidates = async (token, filters, page) => {
  const params = { ...filters, page, limit: 20 };
  const res = await axiosInstance.get("/api/candidates", {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Add a new candidate
export const addCandidate = async (candidateData) => {
  const res = await axiosInstance.post("/api/candidates/create", candidateData);
  return res.data;
};


// Update general details of a candidate
export const updateCandidateGeneral = async (token, id, updateData) => {
  const res = await axiosInstance.patch(`/api/candidates/${id}/general`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update outreach details of a candidate
export const updateCandidateOutreach = async (token, id, updateData) => {
  const res = await axiosInstance.patch(`/api/candidates/${id}/outreach`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete a candidate
export const deleteCandidate = async (token, id) => {
  const res = await axiosInstance.delete(`/api/candidates/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Fetch activity logs for a specific candidate
export const fetchCandidateLogs = async (token, candidateId) => {
  const res = await axiosInstance.get(`/api/candidates/${candidateId}/logs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

