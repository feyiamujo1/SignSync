import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authDataType } from "../utils/types";
// import useAuth from "../../hooks/UseAuth";

const ProtectedRoutes = () => {
  const location = useLocation();
  // const { auth } = useAuth();
  const auth = useAuthUser<authDataType>();
  const role = auth?.role || "";

  return role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
