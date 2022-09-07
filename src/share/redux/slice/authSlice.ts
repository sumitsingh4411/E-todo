import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export const authActions = {
  ...authSlice.actions,
};
export const selectAuth = (state: any) => state.auth || {};
export default authSlice.reducer;
 