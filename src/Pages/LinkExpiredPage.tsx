import { MdOutlineCancel } from "react-icons/md";
import AuthpageSideComponent from "../Components/AuthpageSideComponent";
import { Link } from "react-router-dom";

const LinkExpiredPage = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col md:h-screen md:flex-row">
      <AuthpageSideComponent />
      <div className="flex w-full items-center justify-center md:overflow-y-scroll">
        <div className="mx-auto w-11/12 space-y-3 py-8 sm:w-[400px] md:mt-24 md:w-[350px] md:py-28 xl:w-[400px]">
          <div className="mb-10 space-y-4 md:mb-0">
            <div>
              <MdOutlineCancel className="mx-auto text-center text-6xl text-red-500" />
              <p className="text-center text-xl font-bold md:text-2xl">
                Link Expired
              </p>
              <p className="text-center text-sm mt-1">
                Email verification link has expired.
              </p>
              <p className="text-center">
                Request another verification link{" "}
                <Link
                  to="/email-verification"
                  className="cursor-pointer font-semibold text-custom-blue hover:text-[#d2d2d2]">
                  here!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkExpiredPage;
