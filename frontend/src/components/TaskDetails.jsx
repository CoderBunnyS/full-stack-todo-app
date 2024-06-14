import React, { useState, useEffect } from "react";
import "../assets/TaskDetails.css";

const colorOptions = [
  { color: "#000000", label: "Black" },
  { color: "#FF0000", label: "Red" },
  { color: "#33FF57", label: "Green" },
  { color: "#3357FF", label: "Blue" },
  { color: "#FF33A1", label: "Pink" },
  { color: "#FFFF00", label: "Yellow" },
  { color: "#33FFF5", label: "Cyan" },
  { color: "#FF5733", label: "Orange" },
  { color: "#A833FF", label: "Purple" },
];

const progressOptions = [
  { value: 0, label: "0%" },
  { value: 10, label: "10%" },
  { value: 20, label: "20%" },
  { value: 30, label: "30%" },
  { value: 40, label: "40%" },
  { value: 50, label: "50%" },
  { value: 60, label: "60%" },
  { value: 70, label: "70%" },
  { value: 80, label: "80%" },
  { value: 90, label: "90%" },
  { value: 100, label: "100%" },
];

const TaskDetails = ({ todo, onClose, onSave }) => {
  const [activeTodoContent, setActiveTodoContent] = useState(todo.content);
  const [activeTodoDetails, setActiveTodoDetails] = useState(todo.details || "");
  const [newSubtask, setNewSubtask] = useState("");
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [activeTodoSubtasks, setActiveTodoSubtasks] = useState(todo.subtasks || []);
  const [categoryColor, setCategoryColor] = useState(todo.color || "#000000");
  const [dueDate, setDueDate] = useState(
    todo.dueDate
      ? new Date(todo.dueDate).toISOString().substr(0, 10)
      : new Date().toISOString().substr(0, 10)
  );
  const [progress, setProgress] = useState(todo.progress || 0);

  // useEffect(() => {
  //   console.log("Initial Category Color set to: ", categoryColor);
  // }, []);

  useEffect(() => {
    console.log("Category Color updated to: ", categoryColor);
  }, [categoryColor]);

  const handleSubtaskAdd = (e) => {
    if (e.key === "Enter" && newSubtask.trim()) {
      setActiveTodoSubtasks([
        ...activeTodoSubtasks,
        { content: newSubtask, completed: false },
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
      progress,
    };
    onSave(updatedTodo);
    onClose();
  };

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    console.log("Selected Color: ", selectedColor);
    setCategoryColor(selectedColor);
  };

  return (
    <div className="task-details">
      <div className="task-details-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <input
          className="label"
          type="text"
          placeholder="Task Name"
          value={activeTodoContent}
          onChange={(e) => setActiveTodoContent(e.target.value)}
        />
        <textarea
          value={activeTodoDetails}
          onChange={(e) => setActiveTodoDetails(e.target.value)}
          placeholder="Add details"
          className="label"
        />
        <div className="subtasks">
          <h3>Subtasks</h3>
          <ul>
            {activeTodoSubtasks.map((subtask, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={(e) =>
                    handleSubtaskChange(index, "completed", e.target.checked)
                  }
                />
                <input
                  type="text"
                  className={`label ${subtask.completed ? "completed" : ""}`}
                  value={subtask.content}
                  onChange={(e) =>
                    handleSubtaskChange(index, "content", e.target.value)
                  }
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
              className="label"
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
            <label className="label">
              Due Date:
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="label">
              Category Color:
              <select
                value={categoryColor}
                onChange={handleColorChange}
                className="color-select"
                style={{ backgroundColor: categoryColor }}
              >
                {colorOptions.map((option) => (
                  <option
                    key={option.color}
                    value={option.color}
                    style={{ backgroundColor: option.color, color: option.color === "#000000" ? "white" : "black" }}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label className="label">
              Progress:
              <select
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              >
                {progressOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
