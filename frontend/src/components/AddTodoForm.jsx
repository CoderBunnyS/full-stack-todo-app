
import React, { useState } from 'react';

const AddTodoForm = ({ onAdd }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(content);
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a new todo..."
                className="w-full p-4 rounded shadow-lg"
            />
            <button type="submit" className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-150 ease-in-out">
                Add Todo
            </button>
        </form>
    );
};

export default AddTodoForm;
