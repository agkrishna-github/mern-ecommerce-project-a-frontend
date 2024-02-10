import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  console.log(token);
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
