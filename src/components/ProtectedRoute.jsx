import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../contexts/AppContext";

export default function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  const { isLoggedIn, userLoading } = useContext(AppContext);

  if (userLoading) {
    return null;
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
