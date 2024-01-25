import {useAuthUser} from "react-auth-kit";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const location = useLocation();
  // const { auth } = useAuth();
  const auth = useAuthUser();
  const userInfo = auth();
  const role = userInfo?.role || "";

  return role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
