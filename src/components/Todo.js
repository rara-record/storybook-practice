import React from "react";

const Todo = ({ todo: { id, title, state }, onClickedTodo, onPinTodo }) => {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === "TODO_CHECKED"}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" onClick={() => onClickedTodo(id)} />
      </label>

      <div className="title">
        <input
          type="text"
          value={title}
          readOnly={true}
          placeholder="Input title"
          style={{ textOverflow: "ellipsis" }}
        />
      </div>

      <div className="actions" onClick={(event) => event.stopPropagation()}>
        {state !== "TODO_CHECKED" && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={() => onPinTodo(id)}>
            <span
              className={`icon-star`}
              id={`pinTodo-${id}`}
              aria-label={`pinTodo-${id}`}
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default Todo;
