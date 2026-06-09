import { Navigate } from "react-router";
import React from "react";


interface ProtectedRouteProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
}
const ProtectedRoute = ({ children, isAuthenticated }: ProtectedRouteProps) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;