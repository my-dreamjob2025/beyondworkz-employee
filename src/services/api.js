import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// In-memory access token store — never written to localStorage
let _accessToken = null;

export const setAccessToken = (token) => {
  _accessToken = token;
};

export const getAccessToken = () => _accessToken;

export const clearAccessToken = () => {
  _accessToken = null;
};

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // sends HttpOnly cookies (refresh token)
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

// On 401, try to silently refresh the token once
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
      try {
        const panel = _accessToken
          ? "employee"
          : originalRequest._panel || "employee";
        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`,
          { panel },
          { withCredentials: true }
        );
        if (data.success && data.accessToken) {
          setAccessToken(data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        }
      } catch {
        clearAccessToken();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
