import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Hero from './components/Hero';
import TodoListContainer from './components/TodoListContainer';
import SecureApp from './SecureApp';
import './index.css';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log('Is authenticated:', isAuthenticated);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  return (
    <div className="App">
      <SecureApp>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/todos" element={
            <ProtectedRoute>
              <TodoListContainer />
            </ProtectedRoute>
          } />
        </Routes>
      </SecureApp>
    </div>
  );
}

export default App;
