import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

let authToken = localStorage.getItem("authToken");

let decoded: any = authToken && jwt_decode(authToken || "");
const initialState = {
  isAuthenticated: decoded && decoded?.email ? true : false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLogin(state, action) {
      state.isAuthenticated = true;
    },
    setLogout(state, action) {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {},
});

export const authActions = {
  ...authSlice.actions,
};
export const selectAuth = (state: any) => state.auth || {};
export default authSlice.reducer;
