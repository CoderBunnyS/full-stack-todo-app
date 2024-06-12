const mongoose = require('mongoose');

const ColorLabelSchema = new mongoose.Schema({
  color: { type: String, required: true },
  label: { type: String, required: true },
});

const SubtaskSchema = new mongoose.Schema({
  content: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const TodoSchema = new mongoose.Schema({
  content: { type: String, required: true },
  details: { type: String },
  subtasks: [SubtaskSchema],
  color: { type: String, default: '#000000' },
  dueDate: { type: Date },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
