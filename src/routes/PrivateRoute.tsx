import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute() {
  const { token } = useContext(AuthContext);

  if (token === null && typeof window !== "undefined") {
    const stored = localStorage.getItem("token");
    if (stored) return <Outlet />;
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
