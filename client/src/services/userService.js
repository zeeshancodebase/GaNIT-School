// services/userService.js
import axiosInstance from "../api/axios";

// Get all users
export const getAllUsers = async () => {
  const response = await axiosInstance.get("/api/user/getAllUsers");
  return response.data;
};

// Get a single user by ID
export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/api/user/${id}`);
  return response.data;
};

// Create a new user
export const createUser = async (formData) => {
  const response = await axiosInstance.post("/api/user/register", formData);
  return response.data;
};

// Update user details
export const updateUser = async (user) => {
  const response = await axiosInstance.patch(`/api/user/${user.id}`, user);
  return response.data;
};

// Delete a user
export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/api/user/${id}`);
  return response.data;
};

// Authenticate user (login)
export const authenticateUser = async (credentials) => {
  const response = await axiosInstance.post("/api/user/authenticate", credentials);
  return response.data;
};

// Update user password
export const updateUserPassword = async (userId, newPasswordData) => {
  const response = await axiosInstance.put(`/api/user/${userId}/updatePassword`, newPasswordData);
  return response.data;
};

// Send password reset email (for forgot password)
export const sendPasswordResetEmail = async (email) => {
  const response = await axiosInstance.post("/api/user/forgotPassword", { email });
  return response.data;
};

// Reset user password using token
export const resetUserPassword = async (token, newPasswordData) => {
  const response = await axiosInstance.post(`/api/user/resetPassword/${token}`, newPasswordData);
  return response.data;
};

// Update user profile (e.g., update name, email, etc.)
export const updateUserProfile = async (userId, updatedProfileData) => {
  const response = await axiosInstance.put(`/api/user/${userId}/profile`, updatedProfileData);
  return response.data;
};

// Get user roles (admin, user, etc.)
export const getUserRoles = async (userId) => {
  const response = await axiosInstance.get(`/api/user/${userId}/roles`);
  return response.data;
};

// Add a role to a user
export const addUserRole = async (userId, roleData) => {
  const response = await axiosInstance.post(`/api/user/${userId}/addRole`, roleData);
  return response.data;
};

// Remove a role from a user
export const removeUserRole = async (userId, roleId) => {
  const response = await axiosInstance.delete(`/api/user/${userId}/removeRole/${roleId}`);
  return response.data;
};

// Get user activity log
export const fetchUserActivityLog = async (userId) => {
  const response = await axiosInstance.get(`/api/user/${userId}/activity`);
  return response.data;
};

// Get user's friends/connections (if applicable)
export const fetchUserConnections = async (userId) => {
  const response = await axiosInstance.get(`/api/user/${userId}/connections`);
  return response.data;
};

// Block a user
export const blockUser = async (userId, blockedUserId) => {
  const response = await axiosInstance.post(`/api/user/${userId}/block`, { blockedUserId });
  return response.data;
};

// Unblock a user
export const unblockUser = async (userId, blockedUserId) => {
  const response = await axiosInstance.post(`/api/user/${userId}/unblock`, { blockedUserId });
  return response.data;
};

// Get user notifications
export const fetchUserNotifications = async (userId) => {
  const response = await axiosInstance.get(`/api/user/${userId}/notifications`);
  return response.data;
};

// Mark notification as read
export const markNotificationAsRead = async (userId, notificationId) => {
  const response = await axiosInstance.put(`/api/user/${userId}/notifications/${notificationId}/read`);
  return response.data;
};

// Delete a specific notification
export const deleteNotification = async (userId, notificationId) => {
  const response = await axiosInstance.delete(`/api/user/${userId}/notifications/${notificationId}`);
  return response.data;
};

// Get all user activity stats (e.g., login times, posts, etc.)
export const fetchUserStats = async (userId) => {
  const response = await axiosInstance.get(`/api/user/${userId}/stats`);
  return response.data;
};

// Deactivate a user account (soft delete)
export const deactivateUserAccount = async (userId) => {
  const response = await axiosInstance.put(`/api/user/${userId}/deactivate`);
  return response.data;
};

// Reactivate a user account
export const reactivateUserAccount = async (userId) => {
  const response = await axiosInstance.put(`/api/user/${userId}/reactivate`);
  return response.data;
};
