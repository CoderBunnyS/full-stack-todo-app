// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/todos';

const getTodos = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createTodo = async (content, token) => {
  const response = await axios.post(
    API_URL,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

const updateTodo = async (id, content, token) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    { content },
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
