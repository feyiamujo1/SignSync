import Lottie from "lottie-react";
import loading_animation from "../assets/animation/play-loading.json";

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-white flex justify-center items-center z-[60]">
      <div className="w-[100px]">
        <Lottie className="" animationData={loading_animation} loop={true} />
      </div>
    </div>
  );
};

export default LoadingPage;
