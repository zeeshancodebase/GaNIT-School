import axiosInstance from "../api/axios";

// Get all candidates
export const fetchCandidates = async () => {
  const response = await axiosInstance.get("/api/candidates/getAllCandidates");
  return response.data.data;
};

// Get a single candidate by ID
export const fetchCandidateById = async (id) => {
  const response = await axiosInstance.get(`/api/candidates/${id}`);
  return response.data;
};

// Create a new candidate
export const createCandidate = async (formData) => {
  const response = await axiosInstance.post("/api/candidates/createCandidate", formData);
  return response.data;
};

// Update candidate details
export const updateCandidate = async (candidate) => {
  const response = await axiosInstance.patch(`/api/candidates/${candidate.id}`, candidate);
  return response.data;
};

// Delete a candidate
export const deleteCandidate = async (id) => {
  const response = await axiosInstance.delete(`/api/candidates/${id}`);
  return response.data;
};

// Authenticate candidate (if login system is needed)
export const authenticateCandidate = async (credentials) => {
  const response = await axiosInstance.post("/api/candidates/authenticate", credentials);
  return response.data;
};

// Update candidate password
export const updateCandidatePassword = async (candidateId, newPasswordData) => {
  const response = await axiosInstance.put(`/api/candidates/${candidateId}/updatePassword`, newPasswordData);
  return response.data;
};

// Send password reset email (for forgot password)
export const sendPasswordResetEmail = async (email) => {
  const response = await axiosInstance.post("/api/candidates/forgotPassword", { email });
  return response.data;
};

// Reset candidate password using token
export const resetCandidatePassword = async (token, newPasswordData) => {
  const response = await axiosInstance.post(`/api/candidates/resetPassword/${token}`, newPasswordData);
  return response.data;
};

// Update candidate profile (e.g., update name, education, skills, etc.)
export const updateCandidateProfile = async (candidateId, updatedProfileData) => {
  const response = await axiosInstance.put(`/api/candidates/${candidateId}/profile`, updatedProfileData);
  return response.data;
};

// Get candidate roles (if applicable)
export const getCandidateRoles = async (candidateId) => {
  const response = await axiosInstance.get(`/api/candidates/${candidateId}/roles`);
  return response.data;
};

// Add a role to a candidate (if applicable)
export const addCandidateRole = async (candidateId, roleData) => {
  const response = await axiosInstance.post(`/api/candidates/${candidateId}/addRole`, roleData);
  return response.data;
};

// Remove a role from a candidate (if applicable)
export const removeCandidateRole = async (candidateId, roleId) => {
  const response = await axiosInstance.delete(`/api/candidates/${candidateId}/removeRole/${roleId}`);
  return response.data;
};

// Get candidate activity log (if applicable)
export const fetchCandidateActivityLog = async (candidateId) => {
  const response = await axiosInstance.get(`/api/candidates/${candidateId}/activity`);
  return response.data;
};

// Block a candidate (if applicable)
export const blockCandidate = async (candidateId, blockedCandidateId) => {
  const response = await axiosInstance.post(`/api/candidates/${candidateId}/block`, { blockedCandidateId });
  return response.data;
};

// Unblock a candidate (if applicable)
export const unblockCandidate = async (candidateId, blockedCandidateId) => {
  const response = await axiosInstance.post(`/api/candidates/${candidateId}/unblock`, { blockedCandidateId });
  return response.data;
};

// Get candidate notifications (if applicable)
export const fetchCandidateNotifications = async (candidateId) => {
  const response = await axiosInstance.get(`/api/candidates/${candidateId}/notifications`);
  return response.data;
};

// Mark notification as read (if applicable)
export const markNotificationAsRead = async (candidateId, notificationId) => {
  const response = await axiosInstance.put(`/api/candidates/${candidateId}/notifications/${notificationId}/read`);
  return response.data;
};

// Delete a specific notification (if applicable)
export const deleteCandidateNotification = async (candidateId, notificationId) => {
  const response = await axiosInstance.delete(`/api/candidates/${candidateId}/notifications/${notificationId}`);
  return response.data;
};

// Get all candidate activity stats (e.g., applications, profile updates, etc.)
export const fetchCandidateStats = async (candidateId) => {
  const response = await axiosInstance.get(`/api/candidates/${candidateId}/stats`);
  return response.data;
};

// Deactivate a candidate account (soft delete)
export const deactivateCandidateAccount = async (candidateId) => {
  const response = await axiosInstance.put(`/api/candidates/${candidateId}/deactivate`);
  return response.data;
};

// Reactivate a candidate account (if applicable)
export const reactivateCandidateAccount = async (candidateId) => {
  const response = await axiosInstance.put(`/api/candidates/${candidateId}/reactivate`);
  return response.data;
};
