
import React from 'react';
import TodoItem from './TodoItem';

const TodoListContainer = ({ todos, onComplete, onEdit, onDelete }) => {
    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-2xl font-bold text-center mb-5">Todo List</h1>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    item={todo}
                    onComplete={onComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TodoListContainer;
