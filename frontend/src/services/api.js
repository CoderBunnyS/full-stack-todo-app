// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/todos';

const getTodos = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.map(todo => ({
    ...todo,
    completed: todo.completed ?? false, // Ensure completed property is present
  }));
};

const createTodo = async (content, token) => {
  const response = await axios.post(
    API_URL,
    { content, completed: false }, // Ensure new todos have a completed property
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

const updateTodo = async (id, data, token) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

const deleteTodo = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getTodos, createTodo, updateTodo, deleteTodo };
