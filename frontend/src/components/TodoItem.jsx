
import React from 'react';

const TodoItem = ({ item, onComplete, onEdit, onDelete }) => {
    return (
        <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4">
            <span className={`flex-1 text-gray-800 ${item.completed ? 'line-through' : ''}`}>{item.content}</span>
            <div className="flex space-x-2">
                <button onClick={() => onComplete(item.id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150 ease-in-out">
                    Complete
                </button>
                <button onClick={() => onEdit(item.id)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-150 ease-in-out">
                    Edit
                </button>
                <button onClick={() => onDelete(item.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-150 ease-in-out">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
