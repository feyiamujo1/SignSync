import { AiFillEdit } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsCloudCheckFill } from "react-icons/bs";

const TextContainer = React.forwardRef<
  HTMLDivElement,
  {
    datum: any;
    setSentenceId: Function;
    setShowDeleteDialog: Function;
    setNewSentence: Function;
    setShowEditTextDialog: Function;
    setApprovedText: Function;
  }
>(
  (
    {
      datum,
      setSentenceId,
      setShowDeleteDialog,
      setNewSentence,
      setShowEditTextDialog,
      setApprovedText,
    },
    ref
  ) => {
    const location = useLocation();
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
              <MdOutlineOndemandVideo className="text-base" />{" "}
              {datum.video_count || "0"} uploaded video(s)
            </p>
            <p className="text-sm text-[#959595] flex items-center">
              <FaUserCircle className="ml-[1px] mr-[5px]" /> {datum?.editor}
            </p>
          </div>
          {location.pathname === "/" ? (
            <div className="flex justify-between items-center font-medium text-sm sm:text-base">
              <button
                onClick={() => {
                  setSentenceId(datum?._id);
                  setNewSentence(datum?.sentence);
                  setShowEditTextDialog(true);
                }}
                className="p-2 flex items-center gap-1 rounded-md bg-[#f4f4f4] md:hover:bg-[#d2d2d2] transition-all duration-300 ">
                Edit Text <AiFillEdit className="text-base mb-0.5" />
              </button>
              <Link
                to={`/admin/view-video/${datum?._id}/`}
                className="p-2 flex items-center gap-0.5 rounded-md text-white bg-custom-blue md:hover:bg-[#d2d2d2] md:hover:text-black active:bg-[#d2d2d2] active:text-black transition-all duration-300 ">
                View Videos <FaChevronRight className="text-sm" />
              </Link>
            </div>
          ) : (
            <div className="flex justify-end items-center font-medium text-sm sm:text-base">
              <button
                onClick={() => {
                  setSentenceId(datum?._id);
                  setApprovedText(true);
                }}
                className="p-2 flex items-center gap-1 rounded-md text-white bg-custom-blue md:hover:bg-[#d2d2d2] md:hover:text-black active:bg-[#d2d2d2] active:text-black transition-all duration-300 ">
                Approve Text <BsCloudCheckFill className="text-lg -mb-0.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    );

    return content;
  }
);

export default TextContainer;
