import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Loading from "./ui/Loading/Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loading text="...Cargando datos" />;
  if (!isAuthenticated) return <Navigate to="/Login" replace />;
  return children;
};

export default ProtectedRoute;
