const VideoPlayerDialog = ({
  setVideoLink,
  videoLink,
  setShowVideoPlayer
}: {
  setVideoLink: Function;
  videoLink: string;
  setShowVideoPlayer: Function;
}) => {
  return (
    <div className="w-screen h-screen top-0 bottom-0 left-0 right-0 m-auto fixed z-50 bg-transparent-black flex justify-center items-center">
      <div className=" rounded-lg bg-white py-4 w-11/12 sm:w-1/2 space-y-2">
        <div className="flex items-center justify-end px-6">
          <button
            onClick={() => {
              setShowVideoPlayer(false);
              setVideoLink("");
            }}
            className="font-semibold text-2xl hover:text-custom-blue active:text-custom-blue">
            x
          </button>
        </div>
        <hr />
        <video src={videoLink} controls playsInline autoPlay className="bg-black w-full "></video>
      </div>
    </div>
  );
};

export default VideoPlayerDialog;
