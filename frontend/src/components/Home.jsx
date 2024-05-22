import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../assets/Home.css';

const Home = () => {
   const { loginWithRedirect } = useAuth0();

  return (
    <div className="hero">
      <h1>Welcome to the Todo App</h1>
      <p>Manage your tasks efficiently and effectively.</p>
      <button className="login-button" onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default Home;
