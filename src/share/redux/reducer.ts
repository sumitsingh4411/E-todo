import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import todoReducer from "./slice/todoSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
