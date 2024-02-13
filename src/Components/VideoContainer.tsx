import { FaChevronRight } from "react-icons/fa6";
import { MdTextFields } from "react-icons/md";
import { Link } from "react-router-dom";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const VideoContainer = React.forwardRef<
  HTMLDivElement,
  {
    datum: any;
    // setVideoId: Function;
    // setShowDeleteDialog: Function;
  }
>(
  (
    {
      datum,
    //   setVideoId,
    //   setShowDeleteDialog,
    },
    ref
  ) => {
    const content = (
      <div
        ref={ref}
        className={`rounded-md shadow-custom-stuff p-3.5 relative space-y-4 `}>
        <div className="w-full bg-[#f4f4f4] h-[170px] flex items-center justify-center text-center rounded-sm relative">
          <video className="bg-black w-full h-full " playsInline controls src={datum?.video_url}></video>
          {/* <button
            onClick={() => {
              setVideoId(datum?._id);
            //   setShowDeleteDialog(true);
            }}
            className="absolute top-2 right-2 bg-white rounded-full p-1.5 md:hover:text-red-500 active:bg-[#d2d2d2] active:text-red-500 transition-all duration-300">
            <RiDeleteBin6Line className="text-xl" />
          </button> */}
        </div>
        <hr />
        <div className="space-y-3">
          <div>
            <p className="text-sm text-[#959595] flex gap-1 items-center">
              <MdTextFields className="text-base" />{" "}
              {datum.word_upload_count || "0"} uploaded text(s)
            </p>
            <p className="text-sm text-[#959595] flex items-center">
              <FaUserCircle className="ml-[1px] mr-[5px]" /> {datum?.editor}
            </p>
          </div>
            <div className="flex justify-end items-center font-medium text-sm sm:text-base">
              <Link
                to={`/admin/review-custom-video/text-submission/${datum?._id}/`}
                className="p-2 flex items-center gap-0.5 rounded-md text-white bg-custom-blue md:hover:bg-[#d2d2d2] md:hover:text-black active:bg-[#d2d2d2] active:text-black transition-all duration-300 ">
                View Text <FaChevronRight className="text-sm" />
              </Link>
            </div>
          
        </div>
      </div>
    );

    return content;
  }
);

export default VideoContainer;
