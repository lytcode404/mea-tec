import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("jwt") : null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user")) || null
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("jwt", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
