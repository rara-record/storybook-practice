import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./slice/todoSlice";

// reducer 병합
const rootReducer = combineReducers({
  todobox: todoSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
