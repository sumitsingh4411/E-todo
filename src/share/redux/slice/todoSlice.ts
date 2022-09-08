import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL_TODO, TODO_KEY } from "../../constant";

const getDemoTodoList = createAsyncThunk("todo/getDemoTodoList", async () => {
  try {
    let data = [];
    const todoList = localStorage.getItem(TODO_KEY);
    if (todoList) {
      data = JSON.parse(todoList);
    } else {
      const res = await axios.get(API_URL_TODO);
      let data: any = res?.data.slice(0, 10);
      for (let i = 0; i < data?.length; i++) {
        data[i].createdAt = new Date().toISOString();
        data[i].remindAt = new Date().toISOString();
      }
      localStorage.setItem(TODO_KEY, JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Some thing went wrong");
  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
    todoListStatus: "idle",
  },
  reducers: {
    setTodoList(state, action) {
      state.todoList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDemoTodoList.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.todoListStatus = "succeeded";
      })
      .addCase(getDemoTodoList.pending, (state, action) => {
        state.todoListStatus = "loading";
      })
      .addCase(getDemoTodoList.rejected, (state, action) => {
        state.todoListStatus = "failed";
      });
  },
});

export const todoActions = {
  ...todoSlice.actions,
  getDemoTodoList,
};
export const selecttodo = (state: any) => state.todo || {};
export default todoSlice.reducer;
