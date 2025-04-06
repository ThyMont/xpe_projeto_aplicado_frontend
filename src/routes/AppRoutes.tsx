import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import History from "../pages/History";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import Landing from "../pages/Landing";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
