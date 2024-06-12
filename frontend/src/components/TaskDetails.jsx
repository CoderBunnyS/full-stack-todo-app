import React, { useState } from 'react';
import '../assets/TaskDetails.css';

const TaskDetails = ({ todo, onClose, onSave }) => {
  const [activeTodoContent, setActiveTodoContent] = useState(todo.content);
  const [activeTodoDetails, setActiveTodoDetails] = useState(todo.details || "");
  const [newSubtask, setNewSubtask] = useState("");
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [activeTodoSubtasks, setActiveTodoSubtasks] = useState(todo.subtasks || []);
  const [categoryColor, setCategoryColor] = useState(todo.color || "#000000");
  const [dueDate, setDueDate] = useState(todo.dueDate || "");
  const [progress, setProgress] = useState(todo.progress || 0);

  const handleSubtaskAdd = (e) => {
    if (e.key === 'Enter' && newSubtask.trim()) {
      setActiveTodoSubtasks([
        ...activeTodoSubtasks,
        { content: newSubtask, completed: false }
      ]);
      setNewSubtask("");
      setShowSubtaskInput(false);
    }
  };

  const handleSubtaskChange = (index, field, value) => {
    const updatedSubtasks = [...activeTodoSubtasks];
    updatedSubtasks[index][field] = value;
    setActiveTodoSubtasks(updatedSubtasks);
  };

  const handleSave = () => {
    const updatedTodo = {
      ...todo,
      content: activeTodoContent,
      details: activeTodoDetails,
      subtasks: activeTodoSubtasks,
      color: categoryColor,
      dueDate,
      progress
    };
    onSave(updatedTodo);
    onClose();
  };

  return (
    <div className="task-details">
      <div className="task-details-content">
        <span className="close" onClick={onClose}>&times;</span>
        <input
          type="text"
          placeholder="Task Name"
          value={activeTodoContent}
          onChange={(e) => setActiveTodoContent(e.target.value)}
        />
        <textarea
          value={activeTodoDetails}
          onChange={(e) => setActiveTodoDetails(e.target.value)}
          placeholder="Add details"
        />
        <div className="subtasks">
          <h3>Subtasks</h3>
          <ul>
            {activeTodoSubtasks.map((subtask, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={(e) => handleSubtaskChange(index, 'completed', e.target.checked)}
                />
                <input
                  type="text"
                  value={subtask.content}
                  onChange={(e) => handleSubtaskChange(index, 'content', e.target.value)}
                />
              </li>
            ))}
          </ul>
          <button
            className="add-subtask-button"
            onClick={() => setShowSubtaskInput(true)}
          >
            Add Subtask
          </button>
          {showSubtaskInput && (
            <input
              type="text"
              placeholder="Enter subtask"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={handleSubtaskAdd}
            />
          )}
        </div>
        <div>
          <label>
            Category Color:
            <input
              type="color"
              value={categoryColor}
              onChange={(e) => setCategoryColor(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Due Date:
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Progress:
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleSave} className="modal-save-button">
          Save
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
