import { NavLink } from "react-router-dom"

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/musclegroup">Muscle Group</NavLink></li>
                
            </ul>
        </nav>
    )
}

export default Nav
