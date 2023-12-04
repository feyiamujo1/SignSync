import { Link } from "react-router-dom";
import AuthpageSideComponent from "../Components/AuthpageSideComponent";
import EmailVerficationForm from "../Components/EmailVerificationForm";

const EmailVerification = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col md:h-screen md:flex-row">
      <AuthpageSideComponent />
      <div className="flex w-full items-center justify-center md:overflow-y-scroll">
        <div className="mx-auto w-11/12 space-y-3 py-8 sm:w-[400px] md:mt-24 md:w-[350px] md:py-28 xl:w-[400px]">
          <div className="mb-10 space-y-4 md:mb-0">
            <div>
              <p className="text-center text-xl font-bold md:text-2xl">
                Email Verification
              </p>
              <p className="text-center text-sm mt-1">
                <span className=" text-green-500 font-medium">
                  Please check your email for a verification link to complete
                  your registration.
                </span>{" "}
                If you haven't received the email yet, enter your email
                address below and we'll resend it to you.
              </p>
            </div>
            <EmailVerficationForm />
            <div>
              <p className="text-center">
                Already verified your account?{" "}
                <Link
                  to="/login"
                  className="cursor-pointer font-semibold text-custom-blue hover:text-[#d2d2d2]">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
