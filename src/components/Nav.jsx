import { NavLink } from "react-router-dom"

const Nav = ({user, handleLogOut}) => {

    let userOptions
    if (user) {
        userOptions = (
            <nav>
                <h3>Welcome {user.name}</h3>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/musclegroup">Muscle Map</NavLink></li>
                <li><NavLink to="/resources">Additional Resources</NavLink></li>
                <li><NavLink to="/addworkout">Add Workout</NavLink></li>
                <li><NavLink to="/workoutoverview">My Workouts</NavLink></li>
                <li><NavLink onClick={handleLogOut}>Log Out</NavLink></li>
            </nav>
        )
    }

    const publicOptions = (
        <nav>
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/signin">Sign In</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/musclegroup">Muscle Map</NavLink></li>
            <li><NavLink to="/resources">Additional Resources</NavLink></li>
        </nav>
    )
    return (
        <header>
            <NavLink to="/musclegroup"></NavLink>
            {user? userOptions : publicOptions}
        </header>
       
    )
}

export default Nav
