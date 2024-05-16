import React, { useState } from 'react';
import TodoListContainer from './components/TodoListContainer';
import AddTodoForm from './components/AddTodoForm';
import EditModal from './components/EditModal';
import './index.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);

    // Handler for adding new todos
    const handleAddTodo = content => {
        const newTodo = {
            id: Date.now(),  // Using timestamp as an ID
            content: content,
            completed: false
        };
        setTodos([...todos, newTodo]);
    };

    // Handler for completing todos
    const handleCompleteTodo = id => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    // Handler for editing todos
    const handleEditInit = todo => {
        setCurrentTodo(todo);
        setIsEditing(true);
    };

    const handleEditSave = (id, newContent) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, content: newContent };
            }
            return todo;
        });
        setTodos(updatedTodos);
        setIsEditing(false);
    };

    // Handler for deleting todos
    const handleDeleteTodo = id => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    // Handler for canceling edits
    const handleEditCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="App">
            <AddTodoForm onAdd={handleAddTodo} />
            <TodoListContainer
                todos={todos}
                onComplete={handleCompleteTodo}
                onEdit={handleEditInit}
                onDelete={handleDeleteTodo}
            />
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
}

export default App;
