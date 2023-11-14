import { useEffect, useState } from "react";
import LoadingPage from "../Components/LoadingPage";
import axios from "axios";

import TextComponent from "../Components/TextComponent";
import VideoComponent from "../Components/VideoComponent";
import { toast } from "react-toastify";

// Custom styling for error toasts
const errorToastStyle = {
  backgroundColor: "#EF4444", // Red background
  color: "white"
};

const errorProgressStyle = {
  backgroundColor: "white"
};

// Custom styling for success toasts
const successToastStyle = {
  backgroundColor: "#45AF34",
  color: "white"
};

const successProgressStyle = {
  backgroundColor: "white"
};

const Video = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionPosition, setCurrentQuestionPosition] = useState(0);
  const [page, setPage] = useState(0);
  const [questions, setQuestions] = useState<
    { id: string; sentence: string }[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingStatus, setIsUploadingStatus] = useState("");
  const [recordedChunks, setRecordedChunks] = useState<any[]>([]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://sign-language-gc07.onrender.com/api/main/handleString"
      );
      if (response.status === 200) {
        setIsLoading(false);
        console.log(response);
        setQuestions(response?.data?.data);
      }
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const uploadVideo = async () => {
    setIsUploading(true);
    setIsUploadingStatus("");
    if (recordedChunks.length === 0) {
      toast.error("Select desired style, size and quantity!", {
        progressStyle: errorProgressStyle,
        style: errorToastStyle,
        position: "top-right",
        autoClose: 3000
      });
      setIsUploadingStatus("");
      setIsUploading(false);
    } else {
      try {
        console.log(questions);
        console.log(questions[currentQuestionPosition]?.id);
        const response = await axios.post(
          `https://sign-language-gc07.onrender.com/api/main/uploadVideo?sentence_id=${questions[currentQuestionPosition]?.id}`
        );
        if (response?.status === 200) {
          // Handle success for each updated number
          toast.success("Video uploaded Successfully", {
            position: "top-right",
            progressStyle: successProgressStyle,
            style: successToastStyle,
            autoClose: 3000
          });
          console.log("here");
          setIsUploadingStatus("Success");
          setIsUploading(false);
        }
      } catch (error) {
        toast.error("Error, please try again later", {
          progressStyle: errorProgressStyle,
          style: errorToastStyle,
          position: "top-right",
          autoClose: 3000
        });
        console.error(error);
      }
    }
  };

  return (
    <div className="relative pt-24">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="w-full flex flex-col md:flex-row gap-10">
            <TextComponent
              questions={questions}
              currentQuestionPosition={currentQuestionPosition}
              setCurrentQuestionPosition={setCurrentQuestionPosition}
              isUploading={isUploading}
              isUploadingStatus={isUploadingStatus}
              setIsUploadingStatus={setIsUploadingStatus}
            />
            <div className="border"></div>
            <VideoComponent
              recordedChunks={recordedChunks}
              setRecordedChunks={setRecordedChunks}
              uploadVideo={uploadVideo}
              isUploading={isUploading}
            />
          </div>
          <div className="absolute bg-[#f5f5ff] flex justify-center items-center gap-1 animate-spin-slow w-[90px] h-[90px] rounded-full right-0 top-14 -z-10 "></div>
        </>
      )}
    </div>
  );
};

export default Video;
