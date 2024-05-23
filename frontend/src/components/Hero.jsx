import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../assets/Hero.css';

const Hero = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="hero-container">
      <h1 className="hero-title">Task Management & To-Do List</h1>
      <p className="hero-description">This productive tool is designed to help you better manage your task projects conveniently!</p>
      <button
        className="hero-button"
        onClick={() => loginWithRedirect()}
      >
        Let's Start
      </button>
      <div className="hero-images">
        <img src="https://source.unsplash.com/random/300x300?task" alt="Task management" className="hero-image" />
        <img src="https://source.unsplash.com/random/300x300?productivity" alt="Productivity" className="hero-image" />
        <img src="https://source.unsplash.com/random/300x300?work" alt="Work organization" className="hero-image" />
      </div>
    </div>
  );
};

export default Hero;
