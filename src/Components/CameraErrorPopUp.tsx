// import { useState } from "react";

const CameraErrorPopUp = ({
  CameraErrorMessage,
  setShowCameraError,
  cameraPermission,
  setCameraPermission
}: {
  CameraErrorMessage: string;
  setShowCameraError: Function;
  cameraPermission: string;
  setCameraPermission: Function;
}) => {
//   const [gettingPermission, setGettingPermission] = useState(false);
  const constraint = {
    video: {
      width: { min: 640, ideal: 1920, max: 1920 },
      height: { min: 400, ideal: 1080 },
      frameRate: 25,
      facingMode: { exact: "user" }
    }
  };
  const getCameraPermission = async () => {
    await navigator.mediaDevices
      .getUserMedia(constraint)
      .then(stream => {
        if (stream) {
          window.location.reload();
        }
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
        } else {
          // Other errors
          setCameraPermission("Camera Error");
        }
        setShowCameraError(true);
      });
  };
  return (
    <div className="w-screen h-screen top-0 bottom-0 left-0 right-0 m-auto fixed z-[100] bg-transparent-black flex justify-center items-center">
      <div className=" rounded-lg bg-white py-4 w-11/12 sm:w-[400px] space-y-2">
        <div className="flex items-center justify-between px-6">
          <p className=" font-semibold text-xl text-red-600">
            {cameraPermission}
          </p>
          <button
            onClick={() => {
              setShowCameraError(false);
            }}
            className="font-semibold text-2xl hover:text-custom-blue active:text-custom-blue">
            x
          </button>
        </div>
        <hr />
        <div className="px-6 space-y-6">
          <div>
            <p className="text-[#959595]">{CameraErrorMessage}</p>
            {/* <p className="text-sm text-[#959595]">Click button bellow to request Permission</p> */}
          </div>
          {cameraPermission !== "Camera Access Denied" && (
            <div className="flex justify-end items-center font-medium">
              <button
                onClick={getCameraPermission}
                className="px-4 md:px-6 py-2 flex items-center gap-0.5 rounded-md text-white bg-custom-blue md:hover:bg-[#d2d2d2] md:hover:text-black active:bg-[#d2d2d2] active:text-black transition-all duration-300 ">
                Request
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <button></button>
      </div>
    </div>
  );
};

export default CameraErrorPopUp;
