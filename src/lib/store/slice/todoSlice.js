import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* 
  선언한 slice의 name에 따라서 액션 생성자, 액션 타입, 리듀서를 자동으로 생성해준다.
  따라서 별도의 createAction이나 createReducer를 사용하지 않아도 된다.
*/

// initialState 생성
const todoBoxData = {
  todos: [],
  status: "idle",
  error: null,
};

export const getTodoList = createAsyncThunk("todos/getTodo", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?userId=1"
  );
  const data = response.data.map((todo) => ({
    id: String(todo.id),
    title: todo.title,
    state: todo.completed ? "TODO_CHECKED" : "TODO_INBOX",
  }));
  console.log(data);
  return data;
});

export const todoSlice = createSlice({
  name: "todobox",
  initialState: todoBoxData,
  reducers: {
    // reducer: 초기 state, action를 받음
    updateTodoState: (state, action) => {
      const { id, newTodoState } = action.payload;
      const findTodoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (findTodoIndex >= 0) {
        state.todos[findTodoIndex].state = newTodoState;
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getTodoList.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.todos = [];
      })
      .addCase(getTodoList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        // Add any fetched tasks to the array
        state.todos = action.payload;
      })
      .addCase(getTodoList.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong";
        state.todos = [];
      });
  },
});

export const { updateTodoState } = todoSlice.actions;
