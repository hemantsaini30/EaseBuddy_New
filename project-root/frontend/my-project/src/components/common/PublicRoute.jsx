import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "./Loader";

/**
 * Wrap any route that should only be accessible for unauthenticated users (like login/register).
 */
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullScreen />;
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
};

export default PublicRoute;
