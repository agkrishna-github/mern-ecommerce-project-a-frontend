import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
