// EditModal.jsx
import React, { useState } from 'react';

const EditModal = ({ isOpen, onClose, todo, onSave }) => {
    const [content, setContent] = useState(todo.content);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(todo.id, content);
        onClose(); // Close the modal after saving
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded">
                <h2 className="text-lg font-bold">Edit Todo</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Save
                    </button>
                    <button onClick={onClose} className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold py-2 px-4 border border-gray-500 rounded mt-4 ml-2">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
