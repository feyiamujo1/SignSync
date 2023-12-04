import { Link } from "react-router-dom";
import ForgotPasswordForm from "../Components/ForgotPasswordForm";
import AuthpageSideComponent from "../Components/AuthpageSideComponent";

const ForgotPassword = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col md:h-screen md:flex-row">
      <AuthpageSideComponent />
      <div className="flex w-full items-center justify-center md:overflow-y-scroll">
        <div className="mx-auto w-11/12 space-y-3 py-8 sm:w-[400px] md:mt-24 md:w-[350px] md:py-28 xl:w-[400px]">
          <div className="mb-10 space-y-4 md:mb-0">
            <div>
              <p className="text-center text-xl font-bold md:text-2xl">
                Forgot your password?
              </p>
              <p className="text-center text-sm mt-1">
                Enter your email below a password reset link will be sent to the
                email you provide below.
              </p>
            </div>
            <ForgotPasswordForm />
            <div>
              <p className="text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="cursor-pointer font-semibold text-custom-blue hover:text-[#d2d2d2]">
                  Login
                </Link>
              </p>
              <p className="text-center">
                Do not have an account?{" "}
                <Link
                  to="/register"
                  className="cursor-pointer font-semibold text-custom-blue hover:text-[#d2d2d2]">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
