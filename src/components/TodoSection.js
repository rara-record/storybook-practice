import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodoList } from "../lib/store/slice/todoSlice";

import TodoList from "./TodoList";

const TodoSection = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.todobox);

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">
          <span className="title-wrapper">Taskbox</span>
        </h1>
      </nav>
      <TodoList />
    </div>
  );
};

export default TodoSection;
