import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  const authUser = localStorage?.getItem("user")
    ? JSON.parse(localStorage?.getItem("user"))
    : null;

  return authUser?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
