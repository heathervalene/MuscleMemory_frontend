import { NavLink } from "react-router-dom"

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/musclegroup">Muscle Map</NavLink></li>
                <li><NavLink to="/addworkout">Add Workout</NavLink></li>
                <li><NavLink to="/workoutdetail">My Workouts</NavLink></li>
                <li><NavLink to="/resources">Additional Resources</NavLink></li>
                
            </ul>
        </nav>
    )
}

export default Nav
