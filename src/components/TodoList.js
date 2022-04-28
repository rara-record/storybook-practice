import Todo from "./Todo";

export default function TaskList({ loading, todos, onClickedTodo, onPinTodo }) {
  const events = {
    onPinTodo,
    onClickedTodo,
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (loading) {
    return (
      <div className="list-items">
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

  // 핀으로 고정된 todo가 상단으로 오게끔 기존 todos를 복사 후, state에 따라 정렬
  const todosInOrder = [
    ...todos.filter((todo) => todo.state === "TODO_PINNED"),
    ...todos.filter((todo) => todo.state !== "TODO_PINNED"),
  ];

  // 정렬 된 데이터 돌려서 보냄
  return (
    <div className="list-items">
      {todosInOrder.map((todo) => (
        <Todo key={todo.id} todo={todo} {...events} />
      ))}
    </div>
  );
}
