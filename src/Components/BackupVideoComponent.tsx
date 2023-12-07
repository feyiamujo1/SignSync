// import { useRecordWebcam } from "react-record-webcam";
// import { BsCameraVideoFill, BsFillStopFill } from "react-icons/bs";
// import Webcam from "react-webcam";
// import { useCallback, useEffect, useRef, useState } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import { MoonLoader } from "react-spinners";
// import Timer from "./Timer";
// import { ReactMediaRecorder } from "react-media-recorder";
import { useReactMediaRecorder } from "react-media-recorder";
// import Webcam from "react-webcam";
import { BsCameraVideoFill, BsFillStopFill } from "react-icons/bs";
import { useCallback, useEffect, useRef, useState } from "react";
import Timer from "./Timer";

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return (
    <video
      ref={videoRef}
      style={{ width: "100%", height: "auto" }}
      className="relative aspect-[1.85/1] md:aspect-auto"
      autoPlay
      controls={false}
      playsInline
    />
  );
};

const BackupVideoComponent = ({
  // recordedChunks,
  // setRecordedChunks,
  // uploadVideo,
  isUploading,
  questions
}: {
  // recordedChunks: any[];
  // setRecordedChunks: Function;
  // uploadVideo: Function;
  isUploading: boolean;
  questions: { id: string; sentence: string }[];
}) => {
  const [showCountDown, setShowCountDown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [counterState, setCounterState] = useState("start");
  const miniTimeoutRef = useRef<number | null>(null);
  const mainTimeoutRef = useRef<number | null>(null);
  // const [videoBlob, setVideoBlob] = useState("");

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    // clearBlobUrl
  } = useReactMediaRecorder({
    video: {
      width: { min: 640, ideal: 1920, max: 1920 },
      height: { min: 400, ideal: 1080 },
      aspectRatio: 1.777777778,
      frameRate: 25,
      facingMode: { exact: "user" }
    },
    audio: false,
    // askPermissionOnMount: true,
    onStop(blobUrl, blob) {
      console.log("Recording stopped. Blob URL:", blobUrl);
      // setVideoBlob(blobUrl);
      console.log("Available Now");
      console.log("Blob is - ", blob);
      console.log("Blob url is - ", blobUrl);
    }
  });

  const handeStartRecording = () => {
    // handleStartCaptureClick();
    // clearBlobUrl();
    setShowCountDown(true);
    setCountdown(5);
    setTimeout(() => {
      setShowCountDown(false);
      handleStartCaptureClick();
    }, 5000);
  };

  const handleStartCaptureClick = () => {
    startRecording();
    miniTimeoutRef.current = setTimeout(() => {
      setShowCountDown(true);
      setCountdown(5);
    }, 5000);

    mainTimeoutRef.current = setTimeout(() => {
      console.log("I'm here too");
      handleStopCaptureClick();
      setShowCountDown(false);
      setCounterState("start");
    }, 10000);
  };
  // const handleStopCaptureClick = () => {
  //   stopRecording();
  //   console.log(mediaBlobUrl);
  //   console.log(typeof mediaBlobUrl);
  // };
  const handleStopCaptureClick = useCallback(() => {
    stopRecording();
    if (mediaBlobUrl) {
      // // const blob = new Blob(mediaBlobUrl, {
      // //   type: "video/mp4"
      // // });
      // // const url = URL.createObjectURL(blob);
      // // const a = document.createElement("a");
      // // document.body.appendChild(a);
      // // //   a.style = "display: none";
      // // a.href = url;
      // // a.download = "translation.mp4";
      // // a.click();
      // // window.URL.revokeObjectURL(url);
      // // fetch(mediaBlobUrl)
      // //   .then(response => response.blob())
      // //   .then(blob => {
      // //     const blobUrl = URL.createObjectURL(blob);
      // //     // Now you can use blobUrl as needed
      // //     console.log(blobUrl);
      // //     // Don't forget to revoke the object URL when you're done to free up resources
      // //     URL.revokeObjectURL(blobUrl);
      // //   })
      // //   .catch(error => {
      // //     console.error("Error fetching the Blob:", error);
      // //   });
      // // setRecordedChunks([]);
      // const anchor = document.createElement("a");
      // anchor.href = mediaBlobUrl;
      // anchor.download = "recorded-video.mp4"; // Set the desired file name
      // anchor.click();
    }
  }, [mediaBlobUrl]);

  return (
    <div className="md:w-1/2 mb-24 md:mb-0">
      <h1 className="font-medium text-2xl mb-1 font-[Rowdies] ">
        Record Sign Language
      </h1>
      <p className="text-[#959595] mb-8">
        Capture your sign language translation for the given text. Each video
        will last for a maximum of 1 minute.
      </p>
      <div className="aspect-video bg-black overflow-hidden relative ">
        {showCountDown && countdown !== 0 && (
          <div className="w-full h-full  flex justify-center items-center z-30 absolute bottom-0 top-0 right-0 left-0 m-auto ">
            <Timer
              countdown={countdown}
              setCountdown={setCountdown}
              counterState={counterState}
            />
          </div>
        )}
        <div>
          {status === "recording" ? (
            <button
              disabled={showCountDown}
              className="absolute bottom-4 z-50 left-0 right-0 mx-auto rounded-md px-2 py-1.5 bg-[#d30222] w-fit text-white flex items-center gap-2"
              onClick={handleStopCaptureClick}>
              Stop Recording
              <BsFillStopFill className="text-custom-blue" />
            </button>
          ) : (
            <button
              disabled={showCountDown}
              className="absolute bottom-4 z-50 left-0 right-0 mx-auto rounded-md px-2 py-1.5 bg-custom-blue w-fit text-white flex items-center gap-2 transition-all duration-500 hover:backdrop-blur-[5rem] hover:bg-[#202020] group disabled:hover:bg-custom-blue"
              onClick={() => {
                // setRecordedChunks();
                handeStartRecording();
              }}>
              {mediaBlobUrl ? "Retake" : "Start"} Recording
              <BsCameraVideoFill className="text-[#d30222] transition-all duration-500 group-hover:text-white" />
            </button>
          )}
          {status === "stopped" ? (
            <video
              src={mediaBlobUrl}
              style={{ width: "100%", height: "auto" }}
              className="relative aspect-[1.85/1] md:aspect-auto"
              autoPlay
              loop
              playsInline
            />
          ) : (
            <VideoPreview stream={previewStream} />
          )}
          {/* )} */}
        </div>
      </div>
      <div className="text-center mt-3">
        <p className="text-[#959595] capitalize">Status: {status}</p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          disabled={isUploading || questions?.length === 0}
          // onClick={handleSubmit}
          className={`shadow-custom-stuff flex gap-2 items-center justify-center px-3 py-1.5 rounded-md font-semibold text-lg bg-custom-blue text-white active:bg-[#d2d2d2] active:text-black md:hover:text-black  md:hover:bg-[#d2d2d2] transition-all duration-300 w-[109px] h-[40px] disabled:bg-[#d2d2d2]`}>
          {isUploading ? (
            <MoonLoader color="#000" size={20} />
          ) : (
            <>
              Submit <RiUploadCloudFill />
            </>
          )}
        </button>
      </div>
      {/* {recordedChunks.length > 0 && (
        <button onClick={handleShowReplay}>Replay</button>
      )} */}
    </div>
  );
};

export default BackupVideoComponent;
