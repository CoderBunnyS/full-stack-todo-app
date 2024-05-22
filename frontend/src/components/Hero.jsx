import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Hero = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="hero bg-blue-600 text-white h-screen flex items-center justify-center flex-col p-6">
      <h1 className="text-6xl font-bold mb-4">Welcome to the Ultimate ToDo App</h1>
      <p className="text-2xl mb-8">Stay organized, boost your productivity, and manage your tasks effortlessly.</p>
      <button
        className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-300"
        onClick={() => loginWithRedirect()}
      >
        Get Started
      </button>
      <div className="mt-8 flex justify-center space-x-6">
        <img src="https://source.unsplash.com/random/300x300?task" alt="Task management" className="rounded-lg shadow-lg" />
        <img src="https://source.unsplash.com/random/300x300?productivity" alt="Productivity" className="rounded-lg shadow-lg" />
        <img src="https://source.unsplash.com/random/300x300?work" alt="Work organization" className="rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default Hero;
