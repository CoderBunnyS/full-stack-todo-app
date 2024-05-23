import React from 'react';
import '../assets/TodoItem.css'; // Import custom CSS

const TodoItem = ({ todo, onComplete, onEdit, onDelete }) => {
  return (
    <div className="todo-item">
      <div className="todo-content">
        <h3 className="todo-title">{todo.content}</h3>
        <p className="todo-date">{todo.dueDate}</p>
      </div>
      <div className="todo-actions">
        <button className="todo-button complete" onClick={() => onComplete(todo._id)}>Complete</button>
        <button className="todo-button edit" onClick={() => onEdit(todo)}>Edit</button>
        <button className="todo-button delete" onClick={() => onDelete(todo._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
