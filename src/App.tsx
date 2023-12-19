import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Video from "./Pages/Video";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import EmailVerification from "./Pages/EmailVerification";
import VerificationSuccess from "./Pages/VerificationSuccess";
import ForgotPassword from "./Pages/ForgotPassword";
import LinkExpiredPage from "./Pages/LinkExpiredPage";
import ContributeText from "./Pages/ContributeText";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div className="main_container relative w-full p-0 m-0">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        containerId={"custom-toast-container"}
      />
      {/* <div className="relative"> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/translate-text" element={<Video />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route
          path="/verification-successful"
          element={<VerificationSuccess />}
        />
        <Route
          path="/verification-link-expired"
          element={<LinkExpiredPage />}
        />
        <Route path="/contribute-text" element={<ContributeText />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/admin/*" element={<Dashboard />} />
        </Route>
      </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;
