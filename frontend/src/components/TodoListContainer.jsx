
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import AddTodoForm from './AddTodoForm';
import EditModal from './EditModal';
import TodoItem from './TodoItem';
import '../assets/TodoListContainer.css';

const TodoListContainer = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
  
    useEffect(() => {
      const fetchTodos = async () => {
        try {
          const token = await getAccessTokenSilently();
          const todos = await getTodos(token);
          setTodos(todos);
        } catch (error) {
          console.error(error);
        }
      };

      fetchTodos();
    }, [getAccessTokenSilently]);

    const handleAddTodo = async (content) => {
        try {
          const token = await getAccessTokenSilently();
          const newTodo = await createTodo(content, token);
          setTodos([...todos, newTodo]);
        } catch (error) {
          console.error(error);
        }
      };

      const handleCompleteTodo = async (id) => {
        try {
          const token = await getAccessTokenSilently();
          const updatedTodo = await updateTodo(id, { completed: true }, token);
          setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
        } catch (error) {
          console.error(error);
        }
      };
      const handleEditInit = (todo) => {
        setCurrentTodo(todo);
        setIsEditing(true);
      };

      const handleEditSave = async (id, newContent) => {
        try {
          const token = await getAccessTokenSilently();
          const updatedTodo = await updateTodo(id, { content: newContent }, token);
          setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
          setIsEditing(false);
        } catch (error) {
          console.error(error);
        }
      };

      const handleDeleteTodo = async (id) => {
        try {
          const token = await getAccessTokenSilently();
          await deleteTodo(id, token);
          setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleEditCancel = () => {
        setIsEditing(false);
      };

     return (
    <div className="todo-list-container">
      <AddTodoForm onAdd={handleAddTodo} />
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onComplete={handleCompleteTodo}
            onEdit={handleEditInit}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
      {currentTodo && (
        <EditModal
          isOpen={isEditing}
          onClose={handleEditCancel}
          todo={currentTodo}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default TodoListContainer;