import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>
    }

    return children;
}

export default ProtectedRoute;