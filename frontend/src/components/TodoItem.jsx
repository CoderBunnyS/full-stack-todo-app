import React from 'react';
import '../assets/TodoItem.css';

const TodoItem = ({ todo, onComplete, onEdit, onDelete }) => {
  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onComplete(todo._id, !todo.completed);
  };

  return (
    <li className="todo-item bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between mb-4">
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
        <button onClick={(e) => { e.stopPropagation(); onEdit(todo); }} className="modal-edit-button">
          Edit
        </button>
        <button onClick={(e) => { onDelete(todo._id); }} className="modal-delete-button">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
