import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../assets/Hero.css';

const Hero = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({ appState: { returnTo: '/todos' } });
  };

  const openModal = (modalId) => {
    document.getElementById(modalId).style.display = 'block';
  };

  const closeModal = (modalId) => {
    document.getElementById(modalId).style.display = 'none';
  };

  useEffect(() => {
    // Ensure all modals are closed on initial load
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      modal.style.display = 'none';
    });
  }, []);

  const handleClickOutside = (event) => {
    if (event.target.className === 'modal') {
      event.target.style.display = 'none';
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <section className="hero">
        <button onClick={handleLogin} className="login-button">Login</button>
        <div className="hero-content">
          <h1 className="headline">Stay Organized, Stay Productive with DoListify!</h1>
          <p className="subheadline">Your ultimate web tool for listing everything you need to do, ensuring nothing falls through the cracks.</p>
          <button onClick={handleLogin} className="cta-button">Sign Up Now</button>
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature-item" onClick={() => openModal('modal1')}>
            <img src="https://i.ibb.co/2KVzczk/tasks-5545400.png" alt="Task Management Icon" />
            <h3>All-in-One Task Management</h3>
            <p>Consolidate all your tasks, goals, and reminders in one convenient place.</p>
          </div>
          <div className="feature-item" onClick={() => openModal('modal2')}>
            <img src="https://i.ibb.co/10SNm89/clipboard-2489661.png" alt="Customizable Lists Icon" />
            <h3>Customizable Lists</h3>
            <p>Create and categorize lists to suit your specific needs, from work projects to personal errands.</p>
          </div>
          <div className="feature-item" onClick={() => openModal('modal3')}>
            <img src="https://i.ibb.co/yqbHNBD/priority.png" alt="Priority and Due Dates Icon" />
            <h3>Priority and Due Dates</h3>
            <p>Easily prioritize and set deadlines to manage your schedule effectively.</p>
          </div>
          <div className="feature-item" onClick={() => openModal('modal5')}>
            <img src="https://i.ibb.co/G9zvwC5/tasks.png" alt="Notes and Subtasks Icon" />
            <h3>Notes and Subtasks</h3>
            <p>Add details and break down tasks into smaller, actionable steps.</p>
          </div>
          <div className="feature-item" onClick={() => openModal('modal6')}>
            <img src="https://i.ibb.co/92tzzQ7/tracking.png" alt="Progress Tracking Icon" />
            <h3>Progress Tracking</h3>
            <p>Visualize your progress and stay motivated with visual aids.</p>
          </div>
          <div className="feature-item" onClick={() => openModal('modal7')}>
            <img src="https://i.ibb.co/4tHyh83/cross-platform.png" alt="Cross-Device Sync Icon" />
            <h3>Cross-Device Access</h3>
            <p>Access your tasks from any device, anywhere, anytime without downloading an app.</p>
          </div>
        </div>
      </section>

      <div id="modal1" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('modal1')}>&times;</span>
          <h2>All-in-One Task Management</h2>
          <p>With DoListify, you can consolidate all your tasks, goals, and reminders in one convenient place. Our comprehensive task management system allows you to keep everything organized and easily accessible. Whether you're managing work projects, personal errands, or long-term goals, DoListify makes it simple to stay on top of your to-do list.</p>
        </div>
      </div>

      <div id="modal2" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('modal2')}>&times;</span>
          <h2>Customizable Lists</h2>
          <p>DoListify offers highly customizable lists that allow you to organize your tasks exactly how you need. Create and categorize lists for different aspects of your life, from work and study to personal and family tasks. Tailor your lists to fit your unique workflow and preferences.</p>
        </div>
      </div>

      <div id="modal3" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('modal3')}>&times;</span>
          <h2>Priority and Due Dates</h2>
          <p>Easily prioritize your tasks and set deadlines to manage your schedule effectively. With DoListify, you can highlight urgent tasks, set reminders for due dates, and ensure that nothing falls through the cracks. Stay ahead of your deadlines and manage your time efficiently.</p>
        </div>
      </div>

      <div id="modal4" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('modal4')}>&times;</span>
          <h2>Reminders and Alerts</h2>
          <p>Never miss an important task with DoListify's reminders and alerts. Set up notifications for your tasks and get timely reminders to stay on top of your to-do list. Whether it's a meeting, deadline, or personal errand, DoListify ensures you stay informed and prepared.</p>
        </div>
      </div>

      <div id="modal5" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('modal5')}>&times;</span>
          <h2>Notes and Subtasks</h2>
          <p>Add detailed notes and break down your tasks into smaller, actionable steps with DoListify. This feature allows you to add context and clarity to your tasks, making it easier to tackle complex projects. Stay organized and ensure every detail is captured.</p>
        </div>
      </div>

      <div id="modal6" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('modal6')}>&times;</span>
          <h2>Progress Tracking</h2>
          <p>Visualize your progress and stay motivated with DoListify's progress tracking tools. Track your accomplishments, see how much you've done, and stay focused on your goals. Celebrate your achievements and keep moving forward with confidence.</p>
        </div>
      </div>

      <div id="modal7" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('modal7')}>&times;</span>
          <h2>Cross-Device Access</h2>
          <p>Access your tasks from any device, anywhere, anytime without downloading an app. DoListify works seamlessly on your computer, laptop, phone, or any other internet-enabled device. Stay connected and manage your to-do list wherever you are.</p>
        </div>
      </div>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-item">
          <p>"DoListify has been a game-changer for my productivity. I can easily manage all my tasks in one place and never worry about missing a deadline!" – Sarah, Freelance Designer</p>
        </div>
      </section>

      <section className="cta">
        <h2>Stay organized and productive!</h2>
        <p>Sign up for DoListify and start managing your tasks today!</p>
        <button className="cta-button" onClick={handleLogin}>Sign Up Now</button>
      </section>

      <section className="benefits">
        <h2>Who Can Benefit from DoListify?</h2>
        <div className="benefit-list">
          <div className="benefit-item" onClick={() => openModal('modal8')}>
            <h3>For Professionals</h3>
            <p>Boost your productivity by keeping all your work tasks organized and prioritized.</p>
          </div>
          <div className="benefit-item" onClick={() => openModal('modal9')}>
            <h3>For Students</h3>
            <p>Never miss an assignment deadline with customizable lists and reminders.</p>
          </div>
          <div className="benefit-item" onClick={() => openModal('modal10')}>
            <h3>For Parents</h3>
            <p>Manage family schedules, chores, and personal tasks with ease.</p>
          </div>
          <div className="benefit-item" onClick={() => openModal('modal11')}>
            <h3>For Freelancers</h3>
            <p>Keep track of multiple clients and projects with our intuitive interface.</p>
          </div>
          <div className="benefit-item" onClick={() => openModal('modal12')}>
            <h3>For Everyone</h3>
            <p>Enjoy peace of mind knowing that all your tasks are in one place and easily accessible.</p>
          </div>
        </div>
      </section>

      <div id="modal8" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('modal8')}>&times;</span>
          <h2>For Professionals</h2>
          <p>Boost your productivity by keeping all your work tasks organized and prioritized. With DoListify, professionals can manage their workload effectively, set clear goals, and ensure timely completion of tasks. Enhance your efficiency and stay ahead in your career.</p>
        </div>
      </div>

      <div id="modal9" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('modal9')}>&times;</span>
          <h2>For Students</h2>
          <p>Never miss an assignment deadline with customizable lists and reminders. DoListify helps students stay on top of their academic responsibilities, organize their study schedules, and manage their time effectively. Achieve academic success with ease.</p>
        </div>
      </div>

      <div id="modal10" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('modal10')}>&times;</span>
          <h2>For Parents</h2>
          <p>Manage family schedules, chores, and personal tasks with ease. DoListify helps parents keep track of their busy lives, ensuring that nothing gets overlooked. Organize family activities, plan meals, and manage household tasks efficiently.</p>
        </div>
      </div>

      <div id="modal11" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('modal11')}>&times;</span>
          <h2>For Freelancers</h2>
          <p>Keep track of multiple clients and projects with our intuitive interface. DoListify enables freelancers to manage their projects, meet deadlines, and stay organized. Increase your productivity and deliver exceptional work to your clients.</p>
        </div>
      </div>

      <div id="modal12" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => closeModal('modal12')}>&times;</span>
          <h2>For Everyone</h2>
          <p>Enjoy peace of mind knowing that all your tasks are in one place and easily accessible. DoListify is designed for everyone who wants to stay organized and productive. Simplify your life and achieve your goals with DoListify.</p>
        </div>
      </div>
    </>
  );
};

export default Hero;
