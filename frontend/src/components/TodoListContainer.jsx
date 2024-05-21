
import React, { useState, useEffect } from 'react';
//import TodoItem from './TodoItem';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';

const TodoListContainer = ({ token }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
  
    useEffect(() => {
      const fetchTodos = async () => {
        const todos = await getTodos(token);
        setTodos(todos);
      };
      fetchTodos();
    }, [token]);
  
    const handleCreateTodo = async () => {
      const todo = await createTodo(newTodo, token);
      setTodos([...todos, todo]);
      setNewTodo('');
    };
  
    const handleUpdateTodo = async (id, content) => {
      const updatedTodo = await updateTodo(id, content, token);
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
    };
  
    const handleDeleteTodo = async (id) => {
      await deleteTodo(id, token);
      setTodos(todos.filter(todo => todo._id !== id));
    };
  
    return (
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleCreateTodo}>Add Todo</button>
        <ul>
          {todos.map(todo => (
            <li key={todo._id}>
              <input
                type="text"
                value={todo.content}
                onChange={(e) => handleUpdateTodo(todo._id, e.target.value)}
              />
              <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TodoListContainer;