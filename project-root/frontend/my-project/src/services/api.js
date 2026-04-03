import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

// Create Axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ─── Request Interceptor: attach token ────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("easebuddy_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor: handle 401 ─────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired — clear storage and redirect to login
      localStorage.removeItem("easebuddy_token");
      localStorage.removeItem("easebuddy_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
