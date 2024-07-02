import React from 'react';
import '../assets/TodoItem.css';

const TodoItem = ({ todo, onComplete, onEdit, onDelete, nonce }) => {
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onComplete(todo._id, !todo.completed);
  };

  return (
    <li className="todo-item bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between mb-4 relative">
      <div
        className="color-indicator"
        style={{ backgroundColor: todo.color }}
        nonce={nonce}
      ></div>
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxClick}
          className="mr-2"
          onClick={(e) => e.stopPropagation()}
          nonce={nonce}
        />
        <span className={`todo-content ${todo.completed ? 'line-through' : ''}`} nonce={nonce}>
          {todo.content}
        </span>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(todo);
          }}
          className="modal-edit-button"
          nonce={nonce}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(todo._id);
          }}
          className="modal-delete-button"
          nonce={nonce}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
