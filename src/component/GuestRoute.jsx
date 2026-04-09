import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router"

export default function GuestRoute({ children }) {
    const { user } = useAuth();

    // If user is logged in, redirect to dashboard. 
    // Otherwise, render the guest-only component (Login/Register).
    return user ? <Navigate to="/dashboard" replace /> : children;
}
