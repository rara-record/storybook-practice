import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodo = createAsyncThunk("todos/getTodo", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?userId=1"
  );
  const data = response.data.map((todo) => ({
    id: String(todo.id),
    title: todo.title,
    state: todo.completed ? "TODO_CHECKED" : "TODO_INBOX",
  }));
  return data;
});
