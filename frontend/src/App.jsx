import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import TodoListContainer from './components/TodoListContainer';
import './assets/index.css';

function App() {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
          navigate('/todos');
        }
      }, [isAuthenticated, navigate]);

    return (
        <div className="App">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<TodoListContainer />} />
   
      </Routes>
        </div>
    );
}

export default App;
