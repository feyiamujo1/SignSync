import Lottie from "lottie-react";
import animation from "../assets/animation/hello.json";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="w-[90%] mx-auto flex flex-col md:flex-row-reverse md:h-screen pt-24">
      <div className="w-full md:w-1/2 h-fit flex flex-col md:justify-center lg:justify-end lg:px-4 ">
        <div className="w-[250px] sm:w-[70%] mx-auto md:w-full h-fit">
          <Lottie className="" animationData={animation} loop={true} />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center lg:pr-4 relative pb-32 md:pb-0">
        <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl mb-3 font-[Rowdies] relative z-10">
          Welcome to <span className="text-custom-blue">SignSync</span>{" "}
          <span className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] animate-bounce rounded-full  bg-[#f5f5ff] absolute left-0 -z-10 bottom-0 flex justify-center items-center ">
            <FaPlay className="text-sm -rotate-3" />
          </span>
        </h1>
        <p className="md:text-lg mb-6 relative z-10">
          We strive to close the communication divide and ensure equal access to
          educational content for the Deaf and Hard of Hearing community. Your
          participation in this project has a meaningful impact on enhancing
          educational accessibility. Contribute to our cause, making education
          inclusive for all, as we work together towards a more accessible
          world—one sign at a time!
        </p>
        <Link
          to="/translate-text"
          className="px-4 py-2 font-medium text-lg bg-custom-blue w-fit rounded-md text-white flex gap-2 items-center group active:bg-[#d2d2d2] active:text-black md:hover:text-black  md:hover:bg-[#d2d2d2] transition-all duration-300">
          Contribute <FaPlay className="text-sm group-hover:text-[#fa898e] " />
        </Link>
        <div className="absolute border border-[#b3bcca] border-dashed flex justify-center items-center gap-1 animate-spin-slow w-[90px] h-[90px] rounded-full left-[40%] md:left-[75%] bottom-10 -z-10">
          <div className="bg-[#fa898e] w-3 h-3 rounded "></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
