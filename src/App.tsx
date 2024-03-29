import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import TranslateText from "./Pages/TranslateText";
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
import TranslateVideo from "./Pages/TranslateVideo";

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
        <Route element={<ProtectedRoutes />}>
          {/* Auth pages  */}
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

          {/* User's Pages  */}
          <Route path="/" element={<Home />} />
          <Route path="/translate-text" element={<TranslateText />} />
          <Route path="/translate-video" element={<TranslateVideo />} />
          <Route path="/contribute-text" element={<ContributeText />} />
          {/* Admin Pages */}
          <Route path="/admin/*" element={<Dashboard />} />
        </Route>
      </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;
