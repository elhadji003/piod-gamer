import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("token"), // Si token existe, utilisateur est authentifié
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access, refresh, role } = action.payload;
      state.user = user;
      state.token = access;
      state.refreshToken = refresh;
      state.role = role;
      state.isAuthenticated = true;

      // Sauvegarde des données dans localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("role", role);

      console.log("Token stocké:", access); // Vérifier si le token est bien stocké
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.role = null;
      state.isAuthenticated = false;

      // Suppression des données dans localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    tokenReceived: (state, action) => {
      state.token = action.payload.access;
      localStorage.setItem("token", action.payload.access);
    },
  },
});

export const { setCredentials, logout, setLoading, setError, tokenReceived } =
  authSlice.actions;
export default authSlice.reducer;
