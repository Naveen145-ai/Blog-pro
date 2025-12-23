import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState("loading");
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/v1/me", {
          method: "GET",
          credentials: "include",
        });

        if (!mounted) return;
        setStatus(res.ok ? "authed" : "unauthed");
      } catch {
        if (!mounted) return;
        setStatus("unauthed");
      }
    };

    checkAuth();
    return () => {
      mounted = false;
    };
  }, []);

  if (status === "loading") return null;

  if (status !== "authed") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
