import React from "react";

import TodoList from "./TodoList";
import * as TodoStories from "./Todo.stories";

import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// 더미 데이터
export const MockedState = {
  todos: [
    { ...TodoStories.Default.args.todo, id: "1", title: "Todo 1" },
    { ...TodoStories.Default.args.todo, id: "2", title: "Todo 2" },
    { ...TodoStories.Default.args.todo, id: "3", title: "Todo 3" },
    { ...TodoStories.Default.args.todo, id: "4", title: "Todo 4" },
    { ...TodoStories.Default.args.todo, id: "5", title: "Todo 5" },
    { ...TodoStories.Default.args.todo, id: "6", title: "Todo 6" },
  ],
  status: "idle",
  error: null,
};

const Mockstore = ({ todoboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        todobox: createSlice({
          name: "todobox",
          initialState: todoboxState,
          reducers: {
            updateTodoState: (state, action) => {
              const { id, newTodoState } = action.payload;
              const findTodoIndex = state.todos.findIndex(
                (todo) => todo.id === id
              );
              if (findTodoIndex >= 0) {
                state.todos[findTodoIndex].state = newTodoState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  component: TodoList,
  title: "TODO/TodoList",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
  excludeStories: /.*MockedState$/,
};

const Template = () => <TodoList />;

export const Default = Template.bind({});
Default.decorators = [
  (story) => <Mockstore todoboxState={MockedState}>{story()}</Mockstore>,
];

export const WithPinnedTodos = Template.bind({});
WithPinnedTodos.decorators = [
  (story) => {
    const pinnedtodos = [
      ...MockedState.todos.slice(0, 5),
      { id: "6", title: "Todo 6 (pinned)", state: "TODO_PINNED" },
    ];

    return (
      <Mockstore
        todoboxState={{
          ...MockedState,
          todos: pinnedtodos,
        }}
      >
        {story()}
      </Mockstore>
    );
  },
];

export const Loading = Template.bind({});
Loading.decorators = [
  (story) => (
    <Mockstore
      todoboxState={{
        ...MockedState,
        status: "loading",
      }}
    >
      {story()}
    </Mockstore>
  ),
];

export const Empty = Template.bind({});
Empty.decorators = [
  (story) => (
    <Mockstore
      todoboxState={{
        ...MockedState,
        todos: [],
      }}
    >
      {story()}
    </Mockstore>
  ),
];
