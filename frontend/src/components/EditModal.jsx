import React, { useState } from 'react';
import '../assets/EditModal.css';

const EditModal = ({ isOpen, onClose, todo, onSave }) => {
  const [newContent, setNewContent] = useState(todo.content);

  const handleSave = () => {
    onSave(todo._id, newContent);
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <h2>Edit Todo</h2>
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
