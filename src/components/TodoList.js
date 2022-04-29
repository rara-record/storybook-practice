import Todo from "./Todo";

import { updateTodoState } from "../lib/store/slice/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const TodoList = () => {
  // 리듀서 가지고 오기
  const todos = useSelector((state) => {
    // 핀 된 todo가 위로 오게끔 복사해서 정렬
    const todosInOrder = [
      ...state.todobox.todos.filter((t) => t.state === "TODO_PINNED"),
      ...state.todobox.todos.filter((t) => t.state !== "TODO_PINNED"),
    ];

    // state가 TODO_INBOX 거나 TODO_PINNED인 것만 담아서 리턴
    // (check된 것 안보이게)
    const filteredTodos = todosInOrder.filter(
      (t) => t.state === "TODO_INBOX" || t.state === "TODO_PINNED"
    );
    return filteredTodos;
  });

  const { status } = useSelector((state) => state.todobox);

  const dispatch = useDispatch();

  const PinTodo = (value) => {
    dispatch(
      updateTodoState({
        id: value,
        newTodoState: "TODO_PINNED",
      })
    );
  };

  const clickedTodo = (value) => {
    dispatch(
      updateTodoState({
        id: value,
        newTodoState: "TODO_CHECKED",
      })
    );
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === "loading") {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no todos</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  if (todos) {
    return (
      <div className="list-items">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onClickedTodo={clickedTodo}
            onPinTodo={PinTodo}
          />
        ))}
      </div>
    );
  } else {
    <div>not</div>;
  }
};

export default TodoList;
