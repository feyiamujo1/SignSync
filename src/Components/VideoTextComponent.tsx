
import { MdEmail } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const VideoTextComponent = React.forwardRef<
  HTMLDivElement,
  {
    datum: any;
    setShowDeleteDialog: Function;
    setSentenceId: Function;
  }
>(
  (
    {
      datum,
      setShowDeleteDialog,
      setSentenceId,
    },
    ref
  ) => {
    const content = (
      <div
        ref={ref}
        className={`rounded-md shadow-custom-stuff p-3.5 relative space-y-4 `}>
        <div className="w-full p-2 bg-[#f4f4f4] h-[170px] flex items-center justify-center text-center rounded-sm relative">
          <p>{datum?.sentence}</p>
          <button
            onClick={() => {
              setSentenceId(datum?._id);
              setShowDeleteDialog(true);
            }}
            className="absolute top-2 right-2 bg-white rounded-full p-1.5 md:hover:text-red-500 active:bg-[#d2d2d2] active:text-red-500 transition-all duration-300">
            <RiDeleteBin6Line className="text-xl" />
          </button>
        </div>
        <hr />
        <div className="space-y-3">
          <div>
            <p className="text-sm text-[#959595] flex gap-1 items-center">
              <FaUserCircle className="text-base" />{" "}
              {datum?.author?.name}
            </p>
            <p className="text-sm text-[#959595] flex items-center">
              <MdEmail className="ml-[1px] mr-[5px]" /> {datum?.author?.email}
            </p>
          </div>
        </div>
      </div>
    );

    return content;
  }
);

export default VideoTextComponent;
