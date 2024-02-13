import { RiUploadCloudFill } from "react-icons/ri";
import { MoonLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

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

const VideoTranslateTextComponent = ({
    isUploading,
    videos,
    setIsUploading,
    setIsUploadingStatus,
    currentVideoPosition,
    setLoadingNextPage,
    fetchVideos,
    setCurrentVideoPosition,

}: {
    isUploading: boolean;
    videos: { _id: string; video_url: string }[];
    setIsUploading: Function;
    setIsUploadingStatus: Function;
    currentVideoPosition: number;
    setLoadingNextPage: Function;
    fetchVideos: Function;
    setCurrentVideoPosition: Function;
}) => {
    const [videoTextTranslation, setVideoTextTranslation] = useState<string>("");
    const authHeader = useAuthHeader();
    const extractedToken = authHeader();
    const token = extractedToken ? extractedToken.slice(7) : ""

    const handleTextChange = (event: any) => {
        const inputText = event.target.value;
        setVideoTextTranslation(inputText);
    };

    const uploadVideo = async () => {
        setIsUploading(true);
        setIsUploadingStatus("");
        if (token === "") {
            toast.error("Please login to make contribution", {
                progressStyle: errorProgressStyle,
                style: errorToastStyle,
                position: "top-right",
                autoClose: 3000
            });
            setIsUploadingStatus("");
            setIsUploading(false);
        } else {
            if (videoTextTranslation === "") {
                toast.error("No text entered", {
                    progressStyle: errorProgressStyle,
                    style: errorToastStyle,
                    position: "top-right",
                    autoClose: 3000
                });
                setIsUploadingStatus("");
                setIsUploading(false);
            } else {
                try {
                    console.log(videos);
                    console.log(videos[currentVideoPosition]?._id);
                    const response = await axios.post(
                        `https://sign-language-gc07.onrender.com/api/main/videos/upload_text`,
                        { video_id: videos[currentVideoPosition]?._id, sentence: videoTextTranslation },
                        {
                            headers: {
                                Authorization: `${token}`
                            }
                        }
                    );
                    if (response?.status === 200) {
                        // Handle success for each updated number
                        toast.success("Text uploaded successfully", {
                            position: "top-right",
                            progressStyle: successProgressStyle,
                            style: successToastStyle,
                            autoClose: 3000
                        });
                        if (currentVideoPosition === videos.length - 1) {
                            setLoadingNextPage(true);

                            fetchVideos();
                            setCurrentVideoPosition(0);
                        }
                        console.log("here");
                        setVideoTextTranslation("");
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
                    setIsUploading(false);
                    console.error(error);
                }
            }
        }
    };

    return (
        <div className="portrait:w-full w-1/2 videoRecorder">
            <h1 className="font-medium text-lg md:text-2xl mb-1 font-[Rowdies] ">
                Translate Video Content
            </h1>
            <p className="text-[#959595] mb-8">
                Please help us confirm the meaning of the video. Translate the signed
                content into English.
            </p>
            <div className="overflow-hidden relative ">
                <textarea name="videoTranslationText" maxLength={120}
                    placeholder="Type your text here..."
                    className={`w-full aspect-video border rounded-md focus:outline-2 focus:outline-custom-blue  p-4  transition-all duration-300 ${videoTextTranslation.length === 120 &&
                        "focus:outline-red-500 outline-red-500"
                        }`} value={videoTextTranslation} onChange={handleTextChange}></textarea>

            </div>
            <div className="flex justify-center mt-4">
                <button
                    type="button"
                    disabled={isUploading || videos?.length === 0 || videoTextTranslation?.length === 0}
                    onClick={uploadVideo}
                    className={`shadow-custom-stuff flex gap-2 items-center justify-center px-3 py-1.5 rounded-md font-semibold text-lg bg-custom-blue text-white active:bg-[#d2d2d2] active:text-black md:hover:text-black  md:hover:bg-[#d2d2d2] transition-all duration-300 w-[136px] h-[40px] disabled:bg-[#d2d2d2] disabled:pointer-events-none `}>
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

export default VideoTranslateTextComponent;
