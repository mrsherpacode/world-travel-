//This file protects the access to the some pages if the user is not login. or isAuthenticated..
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/FakeAuthContext";
import { useEffect } from "react";
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // this useEffect redirects back to home page if the user is not authenticated
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

export { ProtectedRoute };
