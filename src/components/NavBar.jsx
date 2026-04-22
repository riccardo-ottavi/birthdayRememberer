import { NavLink } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="navbar">
            <nav>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/list'}>List</NavLink>
                <NavLink to={'/new'}>New</NavLink>
                <h3 onClick={handleLogout} className="pointer">
                    Logout
                </h3>
            </nav>
        </div>
    )
}