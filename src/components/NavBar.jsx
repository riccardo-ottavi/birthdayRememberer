import { NavLink } from "react-router-dom"

export default function NavBar(){
    return(
        <div className="navbar">
            <nav>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/list'}>List</NavLink>
                <NavLink to={'/new'}>New</NavLink>
            </nav>
        </div>
    )
}