import api from "./api";

const TOKEN_KEY = "easebuddy_token";
const USER_KEY = "easebuddy_user";

export const authService = {
  /** Register a new student */
  register: async (userData) => {
    const { data } = await api.post("/auth/register", userData);
    localStorage.setItem(TOKEN_KEY, data.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.data));
    return data.data;
  },

  /** Login with email + password */
  login: async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem(TOKEN_KEY, data.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.data));
    return data.data;
  },

  /** Get stored user from localStorage */
  getStoredUser: () => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  },

  /** Fetch current user profile from API */
  fetchMe: async () => {
    const { data } = await api.get("/auth/me");
    return data.data;
  },

  /** Update student profile */
  updateProfile: async (profileData) => {
    const { data } = await api.put("/auth/update-profile", profileData);
    localStorage.setItem(USER_KEY, JSON.stringify(data.data));
    return data.data;
  },

  /** Clear session */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  /** Check if user is logged in */
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};
