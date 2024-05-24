const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  content: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Todo', todoSchema);
