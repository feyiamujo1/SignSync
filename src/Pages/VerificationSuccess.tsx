import { FiCheckCircle } from "react-icons/fi";
import AuthpageSideComponent from "../Components/AuthpageSideComponent";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerificationSuccess = () => {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate("/login");
        }, 5000);
    }, []);
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col md:h-screen md:flex-row">
      <AuthpageSideComponent />
      <div className="flex w-full items-center justify-center md:overflow-y-scroll">
        <div className="mx-auto w-11/12 space-y-3 py-8 sm:w-[400px] md:mt-24 md:w-[350px] md:py-28 xl:w-[400px]">
          <div className="mb-10 space-y-4 md:mb-0">
            <div>
              <FiCheckCircle className="mx-auto text-center text-6xl text-green-500" />
              <p className="text-center text-xl font-bold md:text-2xl">
                Verification Successfull
              </p>
              <p className="text-center text-sm mt-1">
                Email successfully verified.
              </p>
              <div className="flex items-center justify-center">
                Redirecting <PulseLoader size={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
