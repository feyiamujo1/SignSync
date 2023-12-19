// @ts-ignore
import { FaPlay } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const VideoContainerComponent = React.forwardRef<
  HTMLDivElement,
  {
    datum: any;
    setVideoId: Function;
    setShowDeleteDialog: Function;
    setShowVideoPlayer: Function;
    setVideoLink: Function;
  }
>(
  (
    {
      datum,
      setVideoId,
      setShowDeleteDialog,
      // @ts-ignore
      setShowVideoPlayer,
      // @ts-ignore
      setVideoLink
    },
    ref
  ) => {
    const content = (
      <div
        ref={ref}
        className={`rounded-md shadow-custom-stuff p-3.5 relative space-y-4 `}>
        <div className="w-full bg-black h-[170px] flex items-center justify-center text-center rounded-sm relative overflow-hidden">
          <video
            src={datum?.url}
            className=" aspect-video bg-black"
            autoPlay
            playsInline></video>
          <button
            onClick={() => {
              setVideoId(datum?._id);
              setShowDeleteDialog(true);
            }}
            className="absolute top-2 right-2 bg-white z-20 rounded-full p-1.5 md:hover:text-red-500 active:bg-[#d2d2d2] active:text-red-500 transition-all duration-300">
            <RiDeleteBin6Line className="text-xl" />
          </button>
          <div className="w-full h-full bg-transparent-mini-black absolute top-0 bottom-0 right-0 left-0 z-10 flex justify-center items-center">
            <button
              onClick={() => {
                setShowVideoPlayer(true);
                setVideoLink(datum?.url);
              }}
              className="text-2xl text-custom-blue bg-white rounded-full p-1.5 flex justify-center items-center ">
              <FaPlay className=" ml-1" />
            </button>
          </div>
        </div>
        <hr />
        <div className="space-y-3">
          <div className="">
            <p className="text-sm text-[#959595] flex items-center capitalize">
              <FaUserCircle className="ml-[1px] mr-[5px] " />
              {datum?.author?.name}
            </p>
            <p className="text-sm text-[#959595] flex gap-1 items-center">
              <MdOutlineMailOutline className="text-base" />
              {datum?.author?.email || "Not Available"}
            </p>
          </div>
        </div>
      </div>
    );
    return content;
  }
);

export default VideoContainerComponent;
