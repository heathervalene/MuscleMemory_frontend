
import { NavLink } from 'react-router-dom';


const Nav = ({ user, handleLogOut }) => {
    
  const userOptions = (
    <nav className="nav-menu">
      <div>
        <NavLink to="/about" ><img src="https://i.imgur.com/9QrLDLG.png" className="icon" alt="About" />About</NavLink>
        <NavLink to="/musclegroup">
          <img src="https://i.imgur.com/L9J7ruq.png" className="icon" alt="Muscle Map" />
          Muscle Map
        </NavLink>
        <NavLink to="/resources">
          <img src="https://i.imgur.com/FtwtYhq.png" className="icon" alt="Resources" />
          Resources
        </NavLink>
        <NavLink to="/workoutoverview">
          <img src="https://i.imgur.com/g0IO8oi.png" className="icon" alt="My Workouts" />
          My Workouts
        </NavLink>
        <NavLink onClick={handleLogOut}>
          <img src="https://i.imgur.com/R7S5lSR.png" className="icon" alt="Log Out" />
          Log Out
        </NavLink>
      </div>
    </nav>
  );

  const publicOptions = (
    <nav className="nav-menu">
      <div>
        
        <NavLink to="/signin" ><img src="https://i.imgur.com/R7S5lSR.png" className="icon" alt="Log Out" />Sign In</NavLink>
        <NavLink to="/about" ><img src="https://i.imgur.com/9QrLDLG.png" className="icon" alt="About" />About</NavLink>
        <NavLink to="/musclegroup">
          <img src="https://i.imgur.com/L9J7ruq.png" className="icon" alt="Muscle Map" />
          Muscle Map
        </NavLink>
        <NavLink to="/resources">
          <img src="https://i.imgur.com/FtwtYhq.png" className="icon" alt="Resources" />
          Resources
        </NavLink>
      </div>
    </nav>
  );

  return (
    <header>
      <img src="https://i.imgur.com/PJZEuw0.png" alt="logo" className="logo" />
      {user ? userOptions : publicOptions}
    </header>
  );
};

export default Nav;
