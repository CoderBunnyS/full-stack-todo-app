import React, { useState } from 'react';
import '../assets/AddTodoForm.css';

const AddTodoForm = ({ onAdd, inputPlaceholder, buttonText, nonce }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(content);
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-todo-form mb-8 p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg">
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a new Do Task..."
                className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
                nonce={nonce}
            />
            <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-150 ease-in-out"
                nonce={nonce}
            >
                Add a DoListify Task
            </button>
        </form>
    );
};

export default AddTodoForm;
