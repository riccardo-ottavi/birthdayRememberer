import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../contexts/BirthdayContext";

export default function ProtectedRoute({ children }) {
    
    const { token } = useContext(GlobalContext)

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}