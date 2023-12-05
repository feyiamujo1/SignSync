import { Link } from "react-router-dom";
import LoginForm from "../Components/LoginForm";
import AuthpageSideComponent from "../Components/AuthpageSideComponent";
import Navbar from "../Components/Navbar";

const Login = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col md:flex-row">
      <Navbar />
      <AuthpageSideComponent />
      <div className="flex w-full items-center justify-center">
        <div className="mx-auto w-11/12 space-y-3 py-8 sm:w-[400px] md:mt-24 md:w-[350px] md:py-28 xl:w-[400px]">
          <div className="mb-10 space-y-4 md:mb-0">
            <div>
              <p className="text-center text-xl font-bold md:text-2xl">
                Log in to your account
              </p>
              <p className="text-center text-sm mt-1">
                Welcome back! Please enter your information
              </p>
            </div>
            <LoginForm />
            <div>
              <p className="text-center">
                Do not have an account?{" "}
                <Link
                  to="/register"
                  className="cursor-pointer font-semibold text-custom-blue hover:text-[#d2d2d2]">
                  Register
                </Link>
              </p>
              {/* <p className="text-center">
                <Link
                  to="/forgot-password"
                  className="cursor-pointer font-semibold text-custom-blue hover:text-[#d2d2d2]">
                  Forgot your Password?
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
