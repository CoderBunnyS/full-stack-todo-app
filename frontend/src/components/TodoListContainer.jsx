import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import AddTodoForm from './AddTodoForm';
import EditModal from './EditModal';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import '../assets/TodoListContainer.css';

const TodoListContainer = () => {
  const { getAccessTokenSilently, logout } = useAuth0();
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [activeTodo, setActiveTodo] = useState(null);
  const [activeTodoContent, setActiveTodoContent] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: 'read:todos write:todos'
        });
        const todos = await getTodos(token);
        setTodos(todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
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
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error completing todo:', error);
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
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
      setIsEditing(false);
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteTodo(id, token);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedTodos = Array.from(todos);
    const [removed] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, removed);

    setTodos(reorderedTodos);
  };

  const handleTodoClick = (todo) => {
    setActiveTodo(todo);
    setActiveTodoContent(todo.content);
  };

  const closeTodoModal = () => {
    setActiveTodo(null);
  };

  const handleActiveTodoSave = async () => {
    try {
      const token = await getAccessTokenSilently();
      const updatedTodo = await updateTodo(activeTodo._id, { content: activeTodoContent }, token);
      setTodos(todos.map(todo => (todo._id === activeTodo._id ? updatedTodo : todo)));
      closeTodoModal();
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  return (
    <div className="container max-w-full">
      <div className="header flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My DoListify Tasks</h1>
        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="logout-button py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <AddTodoForm onAdd={handleAddTodo} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className="todo-grid"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((todo, index) => (
                <Draggable
                  key={todo._id}
                  draggableId={todo._id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => handleTodoClick(todo)}
                      className="todo-item"
                    >
                      <TodoItem
                        todo={todo}
                        onComplete={handleCompleteTodo}
                        onEdit={handleEditInit}
                        onDelete={handleDeleteTodo}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {currentTodo && (
        <EditModal
          isOpen={isEditing}
          onClose={handleEditCancel}
          todo={currentTodo}
          onSave={handleEditSave}
        />
      )}
      {activeTodo && (
        <div className="modal" onClick={closeTodoModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeTodoModal}>&times;</span>
            <textarea
              value={activeTodoContent}
              onChange={(e) => setActiveTodoContent(e.target.value)}
              className="modal-textarea popup"
            />
            <button onClick={handleActiveTodoSave} className="modal-save-button">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoListContainer;
