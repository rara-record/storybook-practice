import React from "react";

const Todo = ({ todo: { id, title, state }, onFinished, onPinTodo }) => {
  return (
    <div className="list-item">
      <input type="text" value={title} readOnly={true} />
    </div>
  );
};

export default Todo;
