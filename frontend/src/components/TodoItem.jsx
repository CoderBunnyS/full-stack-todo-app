import React from 'react';
import '../assets/TodoItem.css';

const TodoItem = ({ todo, onComplete, onDelete }) => {
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onComplete(todo._id, !todo.completed);
  };

  return (
    <li 
      className="todo-item bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between mb-4 relative cursor-pointer hover:bg-gray-100"
      title="Click to edit this task"
    >
      <div
        className="color-indicator"
        style={{ backgroundColor: todo.color }}
      ></div>
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxClick}
          className="mr-2"
          onClick={(e) => e.stopPropagation()}
        />
        <span className={`todo-content ${todo.completed ? 'line-through' : ''}`}>
          {todo.content}
        </span>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(todo._id);
          }}
          className="modal-delete-button"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
