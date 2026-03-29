import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

/** Panel-specific key so employee / employer / admin can all be open in one browser without clobbering. */
const REFRESH_TOKEN_KEY = "bw_employee_refresh_token";
const LEGACY_REFRESH_TOKEN_KEY = "bw_refresh_token";
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
    localStorage.removeItem(LEGACY_REFRESH_TOKEN_KEY);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(LEGACY_REFRESH_TOKEN_KEY);
  }
};

export const getRefreshToken = () =>
  localStorage.getItem(REFRESH_TOKEN_KEY) || localStorage.getItem(LEGACY_REFRESH_TOKEN_KEY);

export const clearRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(LEGACY_REFRESH_TOKEN_KEY);
};

export const clearTokens = () => {
  clearAccessToken();
  clearRefreshToken();
};

let refreshPromise = null;

async function refreshAccessToken() {
  if (refreshPromise) return refreshPromise;
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  refreshPromise = axios
    .post(`${BASE_URL}/auth/refresh`, {
      refreshToken,
      panel: PANEL,
    })
    .then(({ data }) => {
      if (data?.success && data.accessToken) {
        setAccessToken(data.accessToken);
        return data.accessToken;
      }
      return null;
    })
    .catch(() => null)
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
}

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
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      }
      clearTokens();
    }

    return Promise.reject(error);
  },
);

export default api;
