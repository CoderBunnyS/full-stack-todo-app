import React from 'react';

const TodoItem = ({ todo, onComplete, onEdit, onDelete }) => {
  if (!todo || typeof todo.completed === 'undefined') {
    console.error('Invalid todo object:', todo);
    return null;
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span>{todo.content}</span>
      <button onClick={() => onComplete(todo._id)}>Complete</button>
      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
