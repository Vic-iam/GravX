import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "../Context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode
}
const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {user } = useAuth()
    if(!user){
        return <Navigate to="/" />
    }
    return children
 
}

export default ProtectedRoute;