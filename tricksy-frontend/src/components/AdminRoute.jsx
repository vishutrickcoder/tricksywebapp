import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const { accessToken, user } = useSelector((s) => s.auth);

  if (!accessToken) return <Navigate to="/login" replace />;

  if (!user?.roles?.includes("admin")) return <Navigate to="/" replace />;

  return <Outlet />;
}
