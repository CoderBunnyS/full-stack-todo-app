import React, { useState, useEffect } from 'react';
import '../assets/TaskDetails.css';

const TaskDetails = ({ todo, onClose, onSave }) => {
  const [activeTodoContent, setActiveTodoContent] = useState(todo.content);
  const [activeTodoDetails, setActiveTodoDetails] = useState(todo.details || "");
  const [newSubtask, setNewSubtask] = useState("");
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [activeTodoSubtasks, setActiveTodoSubtasks] = useState(todo.subtasks || []);
  const [categoryColor, setCategoryColor] = useState(todo.color || "#000000");
  const [dueDate, setDueDate] = useState(todo.dueDate ? new Date(todo.dueDate).toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10));
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
        <input className='label'
          type="text"
          placeholder="Task Name"
          value={activeTodoContent}
          onChange={(e) => setActiveTodoContent(e.target.value)}
        />
        <textarea
          value={activeTodoDetails}
          onChange={(e) => setActiveTodoDetails(e.target.value)}
          placeholder="Add details"
          className='label'
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
                  className={`label ${subtask.completed ? 'completed' : ''}`}
                  value={subtask.content}
                  onChange={(e) => handleSubtaskChange(index, 'content', e.target.value)}
                  disabled={subtask.completed}
                />
              </li>
            ))}
          </ul>

          {showSubtaskInput && (
            <input
              type="text"
              placeholder="Enter subtask"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={handleSubtaskAdd}
              autoFocus
              className='label'
            />
          )}
          <button
            className="add-subtask-button"
            onClick={() => setShowSubtaskInput(true)}
          >
            Add Subtask
          </button>
        </div>
        <div className="details-row">
          <div>
          <label className='label'>
              Category Color:
              <input
                type="color"
                value={categoryColor}
                onChange={(e) => setCategoryColor(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className='label'>
              Due Date:
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
          </div>
          <div>
          <label className='label'>
              Progress:
              <select
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              >
                <option value="0">0%</option>
                <option value="10">10%</option>
                <option value="20">20%</option>
                <option value="30">30%</option>
                <option value="40">40%</option>
                <option value="50">50%</option>
                <option value="60">60%</option>
                <option value="70">70%</option>
                <option value="80">80%</option>
                <option value="90">90%</option>
                <option value="100">100%</option>
              </select>
            </label>
          </div>
        </div>
        <button onClick={handleSave} className="modal-save-button">
          Save
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
