const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Middleware to log the user ID
router.use((req, res, next) => {
  console.log('Authenticated user ID:', req.auth ? req.auth.sub : 'No user');
  next();
});

// GET Todos
router.get('/', async (req, res) => {
  const userId = req.auth.sub; // Assuming user ID is in req.auth.sub
  try {
    const todos = await Todo.find({ userId: userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// POST Todo
router.post('/', async (req, res) => {
  try {
    const newTodo = new Todo({ ...req.body, userId: req.auth.sub, completed: false });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
});

// PUT Todo (for updating existing todos)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Updating todo:', id, req.body); // Log the update request
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    console.log('Updated todo:', updatedTodo); // Log the updated document
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Error updating todo' });
  }
});


// DELETE Todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

module.exports = router;
