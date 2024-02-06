import { useAuthUser, useSignOut } from "react-auth-kit";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { pathname } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const signOut = useSignOut();
  const auth = useAuthUser();
  const userInfo = auth();
  const role = userInfo?.role || "";

  const fName = userInfo?.fName || "";

  const expirationTimeInSeconds = localStorage.getItem('expirationTime');
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

  expirationTimeInSeconds && console.log("The token expiration time is - ", new Date(parseInt(expirationTimeInSeconds, 10) * 1000).toLocaleString());

  currentTimestampInSeconds && console.log("The current time stamp is - ", new Date(currentTimestampInSeconds * 1000).toLocaleString());
  if (fName && expirationTimeInSeconds) {
    if (currentTimestampInSeconds > parseInt(expirationTimeInSeconds, 10)) {
      // Token has expired, sign out the user
      signOut();
      localStorage.removeItem("expirationTime");
      navigate("/login");
    }
  }

  return role === "admin" ? (
    <Outlet />
  ) : role !== "admin" && pathname.includes("/admin") ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoutes;
