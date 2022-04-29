import { createSlice } from "@reduxjs/toolkit";

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

const TodoSlice = createSlice({
  name: "todobox",
  initialState: todoBoxData,
  reducers: {
    // reducer: 초기 state, action를 받음
    updateTodoState: (state, action) => {
      console.log(action.payload);
      const { id, newTodoState } = action.payload;
      const findTodoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (findTodoIndex >= 0) {
        state.todos[findTodoIndex].state = newTodoState;
      }
    },
  },
});

export const { updateTodoState } = TodoSlice.actions;
export default TodoSlice;
