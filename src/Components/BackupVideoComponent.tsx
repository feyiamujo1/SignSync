import { RiUploadCloudFill } from "react-icons/ri";
import { MoonLoader } from "react-spinners";
import { useReactMediaRecorder } from "react-media-recorder";
import { BsCameraVideoFill, BsFillStopFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import Timer from "./Timer";
import { toast } from "react-toastify";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

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

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.srcObject = stream;
      // @ts-ignore
      videoRef.current.onloadedmetadata = function (e: any) {
        videoRef?.current?.play();
      };
    }
  }, [stream]);

  if (!stream) {
    return null;
  }
  return (
    <div className="relative w-full h-full aspect-[1.75/1] md:aspect-video overflow-hidden">
      <video
        ref={videoRef}
        style={{ width: "100%", height: "auto" }}
        autoPlay
        controls={false}
        playsInline
      />
    </div>
  );
};

const BackupVideoComponent = ({
  isUploading,
  questions,
  setIsUploading,
  setIsUploadingStatus,
  currentQuestionPosition,
  setLoadingNextPage,
  setPage,
  fetchQuestions,
  setCurrentQuestionPosition,
  showCameraError,
  setShowCameraError,
  setCameraErrorMessage,
  // cameraPermission,
  setCameraPermission
}: {
  isUploading: boolean;
  questions: { _id: string; sentence: string }[];
  setIsUploading: Function;
  setIsUploadingStatus: Function;
  currentQuestionPosition: number;
  setLoadingNextPage: Function;
  setPage: Function;
  fetchQuestions: Function;
  setCurrentQuestionPosition: Function;
  showCameraError: boolean;
  setShowCameraError: Function;
  setCameraErrorMessage: Function;
  cameraPermission: string;
  setCameraPermission: Function;
}) => {
  const [showCountDown, setShowCountDown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [counterState, setCounterState] = useState("start");
  const miniTimeoutRef = useRef<number | null>(null);
  const mainTimeoutRef = useRef<number | null>(null);
  const [generatedVideoFile, setGeneratedVideoFile] = useState<File | null>();
  const [videoPreviewStream, setVideoPreviewStream] =
    useState<MediaStream | null>();
  const authHeader = useAuthHeader();
  const token = authHeader ? authHeader.slice(7) : ""

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      video: {
        // width: 1920,
        // height: 1080,
        aspectRatio: 1.777777778,
        frameRate: 24,
        facingMode: { exact: "user" }
      },
      audio: false,
      askPermissionOnMount: true,
      onStop(blobUrl) {
        generateVideoFile(blobUrl);
      },
      onStart() {
        setGeneratedVideoFile(null);
      },
      stopStreamsOnStop: false
    });

  // const constraint = {
  //   video: {
  //     width: { min: 640, ideal: 1920, max: 1920 },
  //     height: { min: 400, ideal: 1080 },
  //     frameRate: 24,
  //     facingMode: { exact: "user" }
  //   }
  // };

  const generateVideoFile = async (videoBlobUrl: string) => {
    console.log();
    const videoBlob = await fetch(videoBlobUrl).then(r => r.blob());
    const videoFile = new File([videoBlob], "Translation Video.mp4", {
      type: "video/mp4"
    });
    console.log(videoFile);
    setGeneratedVideoFile(videoFile);
  };

  const handeStartRecording = () => {
    clearBlobUrl();
    setShowCountDown(true);
    setCountdown(5);
    setTimeout(() => {
      setShowCountDown(false);
      handleStartCaptureClick();
    }, 5000);
  };

  const handleStartCaptureClick = () => {
    startRecording();
    // @ts-ignore
    miniTimeoutRef.current = setTimeout(() => {
      setShowCountDown(true);
      setCounterState("stop");
      setCountdown(5);
    }, 5000);

    // @ts-ignore
    mainTimeoutRef.current = setTimeout(() => {
      console.log("I'm here too");
      handleStopCaptureClick();
      setShowCountDown(false);
      setCounterState("start");
    }, 10000);
  };

  const handleStopCaptureClick = () => {
    if (miniTimeoutRef.current) {
      clearTimeout(miniTimeoutRef.current);
    }

    if (mainTimeoutRef.current) {
      clearTimeout(mainTimeoutRef.current);
    }
    setShowCountDown(false);
    setCounterState("start");
    setCountdown(0);
    stopRecording();
  };

  // const handleSubmit = async () => {
  //   uploadVideo();
  //   clearBlobUrl();
  // };
  const uploadVideo = async () => {
    setIsUploading(true);
    setIsUploadingStatus("");
    console.log("The generated Video is - ", generatedVideoFile);
    if (!generatedVideoFile) {
      toast.error("No video recorded", {
        progressStyle: errorProgressStyle,
        style: errorToastStyle,
        position: "top-right",
        autoClose: 3000
      });
      setIsUploadingStatus("");
      setIsUploading(false);
    } else {
      // console.log(generatedVideoFile);
      // const url = URL.createObjectURL(generatedVideoFile);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = generatedVideoFile.name;

      // // Append the anchor to the body
      // document.body.appendChild(a);

      // // Trigger a click on the anchor
      // a.click();

      // // Remove the anchor from the body
      // document.body.removeChild(a);

      // // Revoke the URL
      // URL.revokeObjectURL(url);
      try {
        console.log(questions);
        console.log(questions[currentQuestionPosition]?._id);
        const response = await axios.post(
          `https://sign-language-gc07.onrender.com/api/main/uploadVideo?sentence_id=${questions[currentQuestionPosition]?._id}`,
          { video_file: generatedVideoFile },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${token || ""}`
            }
          }
        );
        if (response?.status === 200) {
          // Handle success for each updated number
          toast.success("Video uploaded Successfully", {
            position: "top-right",
            progressStyle: successProgressStyle,
            style: successToastStyle,
            autoClose: 3000
          });
          if (currentQuestionPosition === questions.length - 1) {
            setLoadingNextPage(true);
            setPage((prev: number) => prev + 1);
            fetchQuestions();
            setCurrentQuestionPosition(0);
          }
          console.log("here");
          // setRecordedChunks([]);
          setGeneratedVideoFile(null);
          setIsUploadingStatus("Success");
          setIsUploading(false);
          clearBlobUrl();
        }
      } catch (error) {
        toast.error("Error, please try again later", {
          progressStyle: errorProgressStyle,
          style: errorToastStyle,
          position: "top-right",
          autoClose: 3000
        });
        setIsUploading(false);
        console.error(error);
      }
    }
  };

  const openCamera = async () => {
    const options = {
      audio: false,
      video: {
        facingMode: "user",
        // width:  400,
        // height: 640,
        frameRate: 25
      }
    };
    if (navigator && navigator.mediaDevices) {
      await navigator.mediaDevices
        .getUserMedia(options)
        .then(stream => {
          console.log("success!");
          setCameraErrorMessage("");
          setVideoPreviewStream(stream);
        })
        .catch(e => {
          console.log("e: ", e);
          if (e.name === "NotAllowedError") {
            // Permission denied by the user
            setCameraPermission("Camera Access Denied");
          } else if (
            e.name === "NotFoundError" ||
            e.name === "SourceUnavailableError"
          ) {
            // Camera not found or not available
            setCameraPermission("Camera Unavailable");
          } else if (e.name === "NotReadableError" || "Device In Use") {
            setCameraPermission("Camera In Use");
            setCameraErrorMessage(
              "It seems another device or application is using your camera. Please inspect your camera and refresh the page."
            );
          } else {
            // Other errors
            setCameraPermission("Camera Error");
          }
          console.log("error is here");
          setCameraErrorMessage(
            "It seems there are problems with your camera. Please inspect your camera settings and refresh the page."
          );
          setShowCameraError(true);
        });
    } else {
      setCameraPermission("Camera Error");
      setCameraErrorMessage(
        "It seems there are problems with your camera. Please inspect your camera settings and refresh the page."
      );
      setShowCameraError(true);
    }
  };

  useEffect(() => {
    openCamera();
  }, []);

  return (
    <div className="portrait:w-full w-1/2 videoRecorder">
      <h1 className="font-medium text-lg md:text-2xl mb-1 font-[Rowdies] ">
        Record Sign Language
      </h1>
      <p className="text-[#959595] mb-8">
        Capture your sign language translation for the given text. Each video
        will last for a maximum of 1 minute.
      </p>
      <div className="aspect-video bg-black overflow-hidden relative ">
        {showCountDown && countdown !== 0 && (
          <div className="absolute bottom-0 pb-3 sm:bottom-0 top-0 right-0 left-0 w-full h-full flex justify-center items-center z-30  ">
            <Timer
              countdown={countdown}
              setCountdown={setCountdown}
              counterState={counterState}
            />
          </div>
        )}
        <div>
          <button
            disabled={showCountDown || isUploading}
            className={`absolute bottom-4 left-0 right-0 mx-auto rounded-md px-2 py-1.5 bg-[#d30222] w-fit text-white flex items-center gap-2 transition-visibility ${status === "recording" ? "visible z-50" : "invisible z-0"
              }`}
            onClick={handleStopCaptureClick}>
            <span>Stop Recording</span>
            <span>
              <BsFillStopFill className="text-custom-blue" />
            </span>
          </button>
          <button
            className={`absolute bottom-4 left-0 right-0 mx-auto rounded-md px-2 py-1.5 bg-custom-blue w-fit text-white flex items-center gap-2 transition-all duration-500 hover:backdrop-blur-[5rem] hover:bg-[#202020] group disabled:hover:bg-[#d2d2d2] disabled:hover:!text-white disabled:bg-[#d2d2d2] disabled:!text-white transition-visibility ${status === "acquiring_media" ? "visible z-50" : "invisible z-0"
              }`}
            onClick={openCamera}>
            Get Permission
          </button>
          <button
            disabled={showCountDown || isUploading || showCameraError}
            className={`absolute bottom-4 left-0 right-0 mx-auto rounded-md px-2 py-1.5 bg-custom-blue w-fit text-white flex items-center gap-2 transition-all duration-500 hover:backdrop-blur-[5rem] hover:bg-[#202020] group disabled:hover:bg-[#d2d2d2] disabled:hover:!text-white disabled:bg-[#d2d2d2] disabled:!text-white transition-visibility ${status === "stopped" || status === "idle"
                ? "visible z-50"
                : "invisible z-0"
              }`}
            onClick={handeStartRecording}>
            <span>{mediaBlobUrl ? "Retake" : "Start"}</span>{" "}
            <span>Recording</span>
            <BsCameraVideoFill className="text-[#d30222] transition-all duration-500 group-hover:text-white group-disabled:text-white" />
          </button>
          {status === "stopped" ? (
            <div className="relative aspect-[1.75/1] md:aspect-video overflow-hidden">
              <video
                src={mediaBlobUrl}
                style={{ width: "100%", height: "auto" }}
                // className="relative aspect-[1.85/1] md:aspect-auto"
                autoPlay
                loop
                playsInline
              />
            </div>
          ) : (
            videoPreviewStream && <VideoPreview stream={videoPreviewStream} />
          )}
        </div>
      </div>
      <div className="text-center mt-3">
        <p className="text-[#959595] capitalize">
          <span>Status:</span> <span>{status}</span>
        </p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          disabled={isUploading || questions?.length === 0 || showCameraError}
          onClick={uploadVideo}
          className={`shadow-custom-stuff flex gap-2 items-center justify-center px-3 py-1.5 rounded-md font-semibold text-lg bg-custom-blue text-white active:bg-[#d2d2d2] active:text-black md:hover:text-black  md:hover:bg-[#d2d2d2] transition-all duration-300 w-fit h-[40px] disabled:bg-[#d2d2d2]`}>
          {isUploading ? (
            <MoonLoader color="#000" size={20} />
          ) : (
            <>
              <span>Submit</span>{" "}
              <span>
                <RiUploadCloudFill />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BackupVideoComponent;
