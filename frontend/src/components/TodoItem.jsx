import React from 'react';
import '../assets/TodoItem.css';

const TodoItem = ({ todo, onComplete, onEdit, onDelete }) => {
    return (
<li className="todo-item bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between mb-4">
            <div>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onComplete(todo._id)}
                    className="mr-2"
                />
                <span className={`todo-content ${todo.completed ? 'line-through' : ''}`}>
                    {todo.content}
                </span>
            </div>
            <div className="flex space-x-2 mt-4">
                <button onClick={() => onEdit(todo)} className="text-blue-500 hover:underline">
                    Edit
                </button>
                <button onClick={() => onDelete(todo._id)} className="text-red-500 hover:underline">
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
