import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/ui/Loading/Loading";

const Register = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: "/Dashboard" },
        authorizationParams: { screen_hint: "signup" },
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isAuthenticated) return <Navigate to="/Dashboard" replace />;

  return <Loading text="...Redirigiendo" />;
};

export default Register;
