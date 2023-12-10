import { useEffect, useState } from "react";
import LoadingPage from "../Components/LoadingPage";
import axios from "axios";

import TextComponent from "../Components/TextComponent";
// import VideoComponent from "../Components/VideoComponent";
import Navbar from "../Components/Navbar";
import BackupVideoComponent from "../Components/BackupVideoComponent";

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
  // const [recordedChunks, setRecordedChunks] = useState<any[]>([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `https://sign-language-gc07.onrender.com/api/main/fetchStrings/user?page=${page}`
      );
      if (response.status === 200) {
        console.log(response);
        setQuestions(response?.data?.data);
        setIsLoading(false);
        setLoadingNextPage(false);
      }
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Navbar />
          <div className="w-[90%] mx-auto pt-24">
            <div className="w-full flex flex-col md:flex-row gap-10">
              <TextComponent
                questions={questions}
                currentQuestionPosition={currentQuestionPosition}
                setCurrentQuestionPosition={setCurrentQuestionPosition}
                isUploading={isUploading}
                isUploadingStatus={isUploadingStatus}
                setIsUploadingStatus={setIsUploadingStatus}
                loadingNextPage={loadingNextPage}
              />
              <div className="border"></div>
              {/* <VideoComponent
                recordedChunks={recordedChunks}
                setRecordedChunks={setRecordedChunks}
                uploadVideo={uploadVideo}
                isUploading={isUploading}
                questions={questions}
              /> */}
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
              />
            </div>
            <div className="absolute bg-[#f5f5ff] flex justify-center items-center gap-1 animate-spin-slow w-[90px] h-[90px] rounded-full right-0 top-14 -z-10 "></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Video;
