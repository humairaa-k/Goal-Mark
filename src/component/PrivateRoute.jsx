import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router"

export default function PrivateRoute({ children }) {
    const { user } = useAuth();

    return user? children : <Navigate to="/pages/login"/>
}
