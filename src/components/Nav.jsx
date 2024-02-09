import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Nav = ({ user, handleLogOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const userOptions = (
    <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
      <div>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/musclegroup">Muscle Map</NavLink>
        <NavLink to="/resources">Additional Resources</NavLink>
        <NavLink to="/workoutoverview">My Workouts</NavLink>
        <NavLink onClick={handleLogOut}>Log Out</NavLink>
      </div>
    </nav>
  );

  const publicOptions = (
    <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
      <div>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/musclegroup">Muscle Map</NavLink>
        <NavLink to="/resources">Additional Resources</NavLink>
      </div>
    </nav>
  );

  return (
    <header>
      <div className="nav-toggle" onClick={toggleMenu}>
        ☰
      </div>
      {user ? userOptions : publicOptions}
    </header>
  );
};

export default Nav;
