// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loadAuthState, saveAuthState, clearAuthState } from '../../utils/authUtils';

const initialState = loadAuthState() || {
  user: null,
  error: null,
  loading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      saveAuthState({ user: action.payload });
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      clearAuthState();
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      clearAuthState();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;

export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;
