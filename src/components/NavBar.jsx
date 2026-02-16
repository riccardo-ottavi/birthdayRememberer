import { NavLink } from "react-router-dom"

export default function NavBar(){
    return(
        <div>
            <h3>Sono la NavBar</h3>
            <nav>
                <NavLink to={'/'}>HomePage</NavLink>
                <NavLink to={'/list'}>List</NavLink>
                <NavLink to={'/new'}>New</NavLink>
            </nav>
        </div>
    )
}