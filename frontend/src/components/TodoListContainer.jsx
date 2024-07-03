import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';
import TaskDetails from './TaskDetails';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import '../assets/TodoListContainer.css';
import '../index.css';

const TodoListContainer = ({ nonce }) => {
  const { getAccessTokenSilently, logout } = useAuth0();
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [setIsEditing] = useState(false);
  const [setCurrentTodo] = useState(null);
  const [activeTodo, setActiveTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [filterOption, setFilterOption] = useState('all');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: 'read:todos write:todos'
        });
        const todos = await getTodos(token);
        const completedTodos = todos.filter((todo) => todo.completed).sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));
        const incompleteTodos = todos.filter((todo) => !todo.completed);
        setTodos([...incompleteTodos, ...completedTodos]);
        setFilteredTodos([...incompleteTodos, ...completedTodos]);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      console.log("Modal opened, body overflow set to 'hidden'");
    } else {
      document.body.style.overflow = 'auto';
      console.log("Modal closed, body overflow set to 'auto'");
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const handleAddTodo = async (content) => {
    try {
      const token = await getAccessTokenSilently();
      const newTodo = await createTodo(content, token);
      setTodos([newTodo, ...todos]);
      setFilteredTodos([newTodo, ...todos]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleCompleteTodo = async (id, completed) => {
    try {
      const token = await getAccessTokenSilently();
      const updatedTodo = await updateTodo(id, { completed, completedAt: completed ? new Date() : null }, token);
      const updatedTodos = todos.map(todo => (todo._id === id ? { ...updatedTodo, originalIndex: todo.originalIndex } : todo));
      const completedTodos = updatedTodos.filter(todo => todo.completed).sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));
      const incompleteTodos = updatedTodos.filter(todo => !todo.completed).sort((a, b) => a.originalIndex - b.originalIndex);
      setTodos([...incompleteTodos, ...completedTodos]);
      setFilteredTodos([...incompleteTodos, ...completedTodos]);
    } catch (error) {
      console.error('Error toggling complete todo:', error);
    }
  };

  const handleEditInit = (todo) => {
    setCurrentTodo(todo);
    setIsEditing(true);
  };

  const handleDeleteTodo = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteTodo(id, token);
      const newTodos = todos.filter(todo => todo._id !== id);
      setTodos(newTodos);
      setFilteredTodos(newTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedTodos = Array.from(todos);
    const [removed] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, removed);

    setTodos(reorderedTodos.map((todo, index) => ({ ...todo, originalIndex: index })));
    setFilteredTodos(reorderedTodos.map((todo, index) => ({ ...todo, originalIndex: index }))); 
  };

  const handleTodoClick = (todo) => {
    setActiveTodo(todo);
    setIsModalOpen(true);
    console.log(`Todo clicked: ${todo.content}`);
  };

  const closeTodoDetails = () => {
    setActiveTodo(null);
    setIsModalOpen(false);
    console.log("Todo details modal closed");
  };

  const saveTodoDetails = async (updatedTodo) => {
    try {
      const token = await getAccessTokenSilently();
      const savedTodo = await updateTodo(updatedTodo._id, updatedTodo, token);
      setTodos(todos.map(todo => (todo._id === savedTodo._id ? savedTodo : todo)));
      setFilteredTodos(todos.map(todo => (todo._id === savedTodo._id ? savedTodo : todo)));
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const applyFilterAndSort = (todos, filterOption, sortOption) => {
    let filtered = todos;
    if (filterOption === 'completed') {
      filtered = todos.filter(todo => todo.completed);
    } else if (filterOption === 'notCompleted') {
      filtered = todos.filter(todo => !todo.completed);
    }
    if (sortOption === 'dueDateAsc') {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortOption === 'dueDateDesc') {
      filtered.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    } else if (sortOption === 'color') {
      filtered.sort((a, b) => a.color.localeCompare(b.color));
    } else if (sortOption === 'completed') {
      const completedTodos = filtered.filter(todo => todo.completed);
      const incompleteTodos = filtered.filter(todo => !todo.completed);
      filtered = [...completedTodos, ...incompleteTodos];
    } else if (sortOption === 'notCompleted') {
      const completedTodos = filtered.filter(todo => todo.completed);
      const incompleteTodos = filtered.filter(todo => !todo.completed);
      filtered = [...incompleteTodos, ...completedTodos];
    }
    return filtered;
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    const sortedFilteredTodos = applyFilterAndSort(todos, filterOption, option);
    setFilteredTodos(sortedFilteredTodos);
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
    const sortedFilteredTodos = applyFilterAndSort(todos, option, sortOption);
    setFilteredTodos(sortedFilteredTodos);
  };

  return (
    <div className={`container max-w-full ${isModalOpen ? 'modal-open' : ''}`}>
      <div className="header flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My DoListify Tasks</h1>
        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="logout-button py-2 px-4 rounded"
          nonce={nonce}
        >
          Logout
        </button>
      </div>
      <div className="form-sort-container">
        <AddTodoForm onAdd={handleAddTodo} inputPlaceholder="Add a new Do Task..." buttonText="Add a DoListify Task" nonce={nonce} />
        <div className="filter-sort-row">
          <div className="filter-container">
            <h5 className="filter-label">Filter By:</h5>
            <select
              value={filterOption}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="filter-dropdown"
              nonce={nonce}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="notCompleted">Not Completed</option>
            </select>
          </div>
          <div className="sort-container">
            <h5 className="sort-label">Sort By:</h5>
            <select
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-dropdown"
              nonce={nonce}
            >
              <option value="default">Default</option>
              <option value="dueDateAsc">Sort by Due Date (Oldest to Newest)</option>
              <option value="dueDateDesc">Sort by Due Date (Newest to Oldest)</option>
              <option value="color">Group by Color</option>
              <option value="completed">Sort by Completed</option>
              <option value="notCompleted">Sort by Not Completed</option>
            </select>
          </div>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className="todo-grid flex flex-wrap"
              {...provided.droppableProps}
              ref={provided.innerRef}
              nonce={nonce}
            >
              {filteredTodos.map((todo, index) => (
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
                      onClick={() => !isModalOpen && handleTodoClick(todo)}
                      className={isModalOpen ? 'inactive' : ''}
                      nonce={nonce}
                    >
                      <TodoItem
                        todo={todo}
                        onComplete={handleToggleCompleteTodo}
                        onDelete={handleDeleteTodo}
                        nonce={nonce}
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
      {activeTodo && (
        <TaskDetails
          todo={activeTodo}
          onClose={closeTodoDetails}
          onSave={saveTodoDetails}
          nonce={nonce}
        />
      )}
    </div>
  );
};

export default TodoListContainer;
