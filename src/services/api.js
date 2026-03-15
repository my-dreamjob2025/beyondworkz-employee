import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const REFRESH_TOKEN_KEY = "bw_refresh_token";
const PANEL = "employee";

// In-memory access token (never in localStorage for XSS mitigation)
let _accessToken = null;

export const setAccessToken = (token) => {
  _accessToken = token;
};

export const getAccessToken = () => _accessToken;

export const clearAccessToken = () => {
  _accessToken = null;
};

export const setRefreshToken = (token) => {
  if (token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const clearRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const clearTokens = () => {
  clearAccessToken();
  clearRefreshToken();
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`;
  }
  return config;
});

// On 401, try to refresh using stored refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !originalRequest.url?.includes("/auth/logout")
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
            refreshToken,
            panel: PANEL,
          });
          if (data.success && data.accessToken) {
            setAccessToken(data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(originalRequest);
          }
        } catch {
          clearTokens();
        }
      } else {
        clearAccessToken();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
