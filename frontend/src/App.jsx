import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TodoListContainer from './components/TodoListContainer';
import './assets/index.css';

function App() {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="App">
            <Routes>
            <Route path="/" element={<Home />} />
        {isAuthenticated && <Route path="/todos" component={TodoListContainer} />}
      </Routes>
        </div>
    );
}

export default App;
