import { useEffect, useState } from "react";
import LoadingPage from "../Components/LoadingPage";
import axios from "axios";

import TextComponent from "../Components/TextComponent";
// import VideoComponent from "../Components/VideoComponent";
import Navbar from "../Components/Navbar";
import BackupVideoComponent from "../Components/BackupVideoComponent";
import CameraErrorPopUp from "../Components/CameraErrorPopUp";
import AnotherVideoRecorder from "../Components/AnotherVideoRecorder";

const Video = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [currentQuestionPosition, setCurrentQuestionPosition] = useState(0);
  const [page, setPage] = useState(0);
  const [questions, setQuestions] = useState<
    { _id: string; sentence: string }[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingStatus, setIsUploadingStatus] = useState("");
  const [showCameraError, setShowCameraError] = useState(false);
  const [CameraErrorMessage, setCameraErrorMessage] = useState("");
  const [cameraPermission, setCameraPermission] = useState("Camera Error");
  const [error, setError] = useState("");
  // const [recordedChunks, setRecordedChunks] = useState<any[]>([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `https://sign-language-gc07.onrender.com/api/main/fetchStrings/user?page=${page}`
      );
      if (response.status === 200) {
        setError("");
        setQuestions(response?.data?.data);
        setIsLoading(false);
        setLoadingNextPage(false);
      }
    } catch (error: any) {
      // console.log(error);
      setIsLoading(false);
      if (error.code === "ERR_NETWORK") {
        console.log("Here");
        setError("Network error, please check your internet connection!");
      }
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {!isLoading && (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-transparent-white flex items-center justify-center landscape:hidden z-[110]">
          <div className="w-11/12 md:max-w-[500px] flex flex-col items-center justify-center gap-2 fill-custom-blue">
            <svg
              className="svg-icon w-10"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M768 955.733333H170.666667c-66.030933 0-102.4-36.369067-102.4-102.4V597.333333c0-66.030933 36.369067-102.4 102.4-102.4h324.266666V170.666667c0-66.030933 36.369067-102.4 102.4-102.4h256c66.030933 0 102.4 36.369067 102.4 102.4v597.333333c0 60.381867-30.4128 95.965867-86.135466 101.597867C863.965867 925.320533 828.381867 955.733333 768 955.733333zM170.666667 529.066667c-47.223467 0-68.266667 21.0432-68.266667 68.266666v256c0 47.223467 21.0432 68.266667 68.266667 68.266667h597.333333c41.079467 0 62.3616-15.957333 67.208533-51.2H597.333333c-66.030933 0-102.4-36.369067-102.4-102.4V529.066667H170.666667z m359.458133 256c4.829867 35.242667 26.112 51.2 67.208533 51.2h256c41.079467 0 62.3616-15.957333 67.208534-51.2H530.1248zM529.066667 750.933333h392.533333V187.733333H529.066667v563.2z m1.058133-597.333333h390.4c-4.829867-35.242667-26.112-51.2-67.191467-51.2H597.333333c-41.079467 0-62.3616 15.957333-67.208533 51.2zM170.666667 443.733333c-0.375467 0-0.750933 0-1.1264-0.034133h-0.017067a17.032533 17.032533 0 0 1-10.888533-4.9152l-0.034134-0.034133-85.333333-85.333334a17.0496 17.0496 0 1 1 24.132267-24.132266L153.6 385.467733V341.333333c0-51.6096 18.295467-96.4096 54.391467-133.137066 36.317867-35.6864 80.1792-53.981867 130.577066-54.596267h46.8992l-56.200533-56.200533a17.0496 17.0496 0 1 1 24.132267-24.132267l85.333333 85.333333c0.017067 0 0.017067 0.0512 0.0512 0.034134l0.034133 0.034133 0.0512 0.0512a16.9472 16.9472 0 0 1 4.7104 14.045867v0.017066a16.9984 16.9984 0 0 1-4.949333 9.984l-85.248 85.248a17.0496 17.0496 0 1 1-24.132267-24.132266L385.467733 187.733333H338.773333c-41.6768 0.512-76.629333 15.104-106.666666 44.5952C202.325333 262.656 187.733333 298.376533 187.733333 341.333333v44.1344l56.200534-56.200533a17.0496 17.0496 0 1 1 24.132266 24.132267l-85.248 85.248a17.015467 17.015467 0 0 1-10.0352 4.949333h-0.034133A14.062933 14.062933 0 0 1 170.666667 443.733333z" />
            </svg>
            <p className="">
              This experience is designed to be viewed in landscape. Please
              rotate your device to view the site.
            </p>
          </div>
        </div>
      )}
      {showCameraError && (
        <CameraErrorPopUp
          CameraErrorMessage={CameraErrorMessage}
          setShowCameraError={setShowCameraError}
          cameraPermission={cameraPermission}
          setCameraPermission={setCameraPermission}
          setCameraErrorMessage={setCameraErrorMessage}
        />
      )}
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Navbar />
          <div className="w-[90%] mx-auto pt-24 pb-20">
            <div className="w-full flex flex-row portrait:flex-col  gap-10">
              <TextComponent
                questions={questions}
                currentQuestionPosition={currentQuestionPosition}
                setCurrentQuestionPosition={setCurrentQuestionPosition}
                isUploading={isUploading}
                isUploadingStatus={isUploadingStatus}
                setIsUploadingStatus={setIsUploadingStatus}
                loadingNextPage={loadingNextPage}
                error={error}
              />
              <div className="border hidden landscape:hidden md:block"></div>
              {window.innerWidth < 1024 ? (
                <BackupVideoComponent
                  questions={questions}
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                  setIsUploadingStatus={setIsUploadingStatus}
                  currentQuestionPosition={currentQuestionPosition}
                  setLoadingNextPage={setLoadingNextPage}
                  setPage={setPage}
                  fetchQuestions={fetchQuestions}
                  setCurrentQuestionPosition={setCurrentQuestionPosition}
                  showCameraError={showCameraError}
                  setShowCameraError={setShowCameraError}
                  setCameraErrorMessage={setCameraErrorMessage}
                  cameraPermission={cameraPermission}
                  setCameraPermission={setCameraPermission}
                />
              ) : (
                <AnotherVideoRecorder
                  questions={questions}
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                  setIsUploadingStatus={setIsUploadingStatus}
                  currentQuestionPosition={currentQuestionPosition}
                  setLoadingNextPage={setLoadingNextPage}
                  setPage={setPage}
                  fetchQuestions={fetchQuestions}
                  setCurrentQuestionPosition={setCurrentQuestionPosition}
                  showCameraError={showCameraError}
                  setShowCameraError={setShowCameraError}
                  setCameraErrorMessage={setCameraErrorMessage}
                  cameraPermission={cameraPermission}
                  setCameraPermission={setCameraPermission}
                />
              )}
            </div>
            <div className="absolute bg-[#f5f5ff] flex justify-center items-center gap-1 animate-spin-slow w-[90px] h-[90px] rounded-full right-0 top-14 -z-10 "></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Video;
