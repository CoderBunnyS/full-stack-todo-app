import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Hero from './components/Hero';
import TodoListContainer from './components/TodoListContainer';
import '../src/index.css';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hero />} />
        {isAuthenticated && <Route path="/todos" element={<TodoListContainer />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
