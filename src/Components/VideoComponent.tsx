// import { useRecordWebcam } from "react-record-webcam";
import { BsCameraVideoFill, BsFillStopFill } from "react-icons/bs";
import Webcam from "react-webcam";
import { useCallback, useEffect, useRef, useState } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import { MoonLoader } from "react-spinners";

const VideoComponent = ({
  recordedChunks,
  setRecordedChunks,
  uploadVideo,
  isUploading,
  questions
}: {
  recordedChunks: any[];
  setRecordedChunks: Function;
  uploadVideo: Function;
  isUploading: boolean;
  questions: { id: string; sentence: string }[];
}) => {
  const vidConstraint = {
    width: 1920,
    height: 1080,
    aspectRatio: 1.777777778,
    frameRate: { ideal: 25, max: 25 },
    facingMode: "user"
  };

  // const [openCamera, setOpenCamera] = useState(false);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const replayVideoRef = useRef<HTMLVideoElement | null>(null);
  const [capturing, setCapturing] = useState(false);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    if (recordedChunks.length !== 0) {
      setRecordedChunks([]);
    }

    // @ts-ignore
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    // @ts-ignore
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    // @ts-ignore
    mediaRecorderRef.current.start();

    setTimeout(() => {
      handleStopCaptureClick();
      handleShowReplay();
    }, 5000);
  }, [webcamRef, setCapturing, mediaRecorderRef, recordedChunks]);

  const handleDataAvailable = useCallback(
    ({ data }: any) => {
      if (data.size > 0) {
        // @ts-ignore
        setRecordedChunks(prev => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    // @ts-ignore
    mediaRecorderRef.current.stop();
    setCapturing(false);
    handleShowReplay();
  }, [mediaRecorderRef, webcamRef, setCapturing, recordedChunks]);

  // const handleDownload = useCallback(() => {
  //   if (recordedChunks.length) {
  //     const blob = new Blob(recordedChunks, {
  //       type: "video/webm"
  //     });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     document.body.appendChild(a);
  //     //   a.style = "display: none";
  //     a.href = url;
  //     a.download = "translation.mp4";
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     setRecordedChunks([]);
  //   }
  // }, [recordedChunks]);

  const handleShowReplay = useCallback(() => {
    console.log("here the chunk is - ", recordedChunks);
    if (recordedChunks.length) {
      const ToBeGenBlob = recordedChunks[recordedChunks.length - 1];
      const blob = new Blob([ToBeGenBlob], {
        type: "video/mp4"
      });
      console.log("The blob is - ", blob);
      const url = URL.createObjectURL(blob);
      if (replayVideoRef.current) replayVideoRef.current.src = url;
    }
  }, [recordedChunks]);

  useEffect(() => {
    if (recordedChunks.length > 0) {
      handleShowReplay();
    }
  }, [recordedChunks]);

  const handleSubmit = async () => {
    uploadVideo();
  };

  // const [frameRate, setFrameRate] = useState({ initial: 25 }); // using default frameRate of 25
  // useEffect(() => {
  //   const track = webcamRef?.current?.video?.srcObject?.getVideoTracks()[0];
  //   track?.applyConstraints({
  //     advanced: [{ frameRate: frameRate.initial }],
  //   });
  // }, [frameRate]);

  return (
    <div className="md:w-1/2 mb-24 md:mb-0">
      <h1 className="font-medium text-2xl mb-1 font-[Rowdies] ">
        Record Sign Language
      </h1>
      <p className="text-[#959595] mb-8">
        Capture your sign language translation for the given text. Each video
        will last for a maximum of 1 minute.
      </p>
      <div className=" aspect-video overflow-hidden bg-black relative w-full">
        {
          // openCamera ? (
          <>
            {recordedChunks.length > 0 && (
              <video
                ref={replayVideoRef}
                id="video-replay"
                className=" aspect-video w-full"
                autoPlay
                muted
                loop></video>
            )}
            <Webcam
              audio={false}
              ref={webcamRef}
              // videoConstraints={vidConstraint}
              videoConstraints={vidConstraint}
            />
            {capturing && (
              <>
                <div className="rounded-full bg-[#d30222] absolute right-4 top-4 p-1 animate-ping"></div>
                <div className="rounded-full bg-[#d30222] absolute right-4 top-4 p-1"></div>
              </>
            )}
            {questions?.length !== 0 && (
              <>
                {capturing ? (
                  <button
                    className="absolute bottom-4 left-0 right-0 mx-auto rounded-md px-2 py-1.5 bg-[#d30222] w-fit text-white flex items-center gap-2"
                    onClick={handleStopCaptureClick}>
                    Stop Recording
                    <BsFillStopFill className="text-custom-blue" />
                  </button>
                ) : (
                  <button
                    className="absolute bottom-4 left-0 right-0 mx-auto rounded-md px-2 py-1.5 bg-custom-blue w-fit text-white flex items-center gap-2 transition-all duration-500 hover:backdrop-blur-[5rem] hover:bg-[#202020] group"
                    onClick={() => {
                      setRecordedChunks([]);
                      handleStartCaptureClick();
                    }}>
                    {recordedChunks.length > 0 ? "Retake" : "Start"} Recording
                    <BsCameraVideoFill className="text-[#d30222] transition-all duration-500 group-hover:text-white" />
                  </button>
                )}
              </>
            )}
          </>
          // ) : (
          // <button
          //   type="button"
          //   className="absolute w-fit h-fit left-0 right-0 bottom-0 top-0 m-auto cursor-pointer text-white border backdrop-blur-[5rem] bg-[#202020] rounded-md flex items-center px-2.5 py-1.5 gap-2 z-10 hover:bg-custom-blue hover:border-custom-blue transition-all duration-500"
          //   onClick={() => {
          //     setOpenCamera(true);
          //   }}>
          //   <span>Open camera</span>
          //   <BsCameraVideoFill className="text-[#d30222]" />
          // </button>
          // )
        }
      </div>
      <div className="text-center mt-3">
        <p className="text-[#959595]">
          Status:{" "}
          {capturing
            ? "Camera is Recording"
            : recordedChunks.length > 0
            ? "Showing Replay"
            : "Camera is Idle"}
        </p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          disabled={isUploading || questions?.length === 0}
          onClick={handleSubmit}
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

export default VideoComponent;
