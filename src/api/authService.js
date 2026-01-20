import api from "./axios";

const AUTH_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  REFRESH: "/api/auth/refresh",
  LOGOUT: "/api/auth/logout",
};

/**
 * Login user with username and password
 * @param {string} username - User's email/username
 * @param {string} password - User's password
 * @returns {Promise<Object>} JWT response with tokens and user info
 */
export const login = async (username, password) => {
  const response = await api.post(AUTH_ENDPOINTS.LOGIN, {
    username,
    password,
  });
  return response.data;
};

/**
 * Refresh access token using refresh token
 * @param {string} refreshToken - Current refresh token
 * @returns {Promise<Object>} New tokens
 */
export const refreshAccessToken = async (refreshToken) => {
  const response = await api.post(AUTH_ENDPOINTS.REFRESH, {
    refreshToken,
  });
  return response.data;
};

/**
 * Logout user by invalidating refresh token
 * @param {string} refreshToken - Current refresh token
 * @returns {Promise<void>}
 */
export const logout = async (refreshToken) => {
  try {
    await api.post(AUTH_ENDPOINTS.LOGOUT, {
      refreshToken,
    });
  } catch (error) {
    // Even if logout fails on server, we'll clear local storage
    console.error("Logout error:", error);
  }
};

/**
 * Store auth tokens in localStorage
 * @param {Object} jwtResponse - Response from login API
 */
export const storeTokens = (jwtResponse) => {
  localStorage.setItem("accessToken", jwtResponse.accessToken);
  localStorage.setItem("refreshToken", jwtResponse.refreshToken);
  localStorage.setItem("user", JSON.stringify({
    id: jwtResponse.userId,
    email: jwtResponse.userEmail,
    fullName: jwtResponse.fullName,
    role: jwtResponse.role,
    tenantId: jwtResponse.tenantId,
  }));
};

/**
 * Clear all auth data from localStorage
 */
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

/**
 * Get stored user data
 * @returns {Object|null} User data or null
 */
export const getStoredUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

/**
 * Check if user is authenticated (has valid tokens)
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

/**
 * Get the dashboard path based on user role
 * @param {string} role - User's role
 * @returns {string} Dashboard path
 */
export const getDashboardPath = (role) => {
  const rolePaths = {
    SUPER_ADMIN: "/superadmin",
    ADMIN: "/admin",
    INSTRUCTOR: "/instructor",
    LEARNER: "/learner",
  };
  return rolePaths[role] || "/learner";
};

export default {
  login,
  logout,
  refreshAccessToken,
  storeTokens,
  clearTokens,
  getStoredUser,
  isAuthenticated,
  getDashboardPath,
};
