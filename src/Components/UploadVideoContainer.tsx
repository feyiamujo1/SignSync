import axios from "axios";
import { useState } from "react";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const UploadVideoContainer = ({
    showErrorToast,
    showSuccessToast,
    setShowUploadVideoDialog,
    setToggleRefetchItemsNow,
    toggleRefetchItemsNow,
}: {
    showErrorToast: Function;
    showSuccessToast: Function;
    setShowUploadVideoDialog: Function;
    setToggleRefetchItemsNow: Function;
    toggleRefetchItemsNow: boolean;
}) => {
    const signOut = useSignOut();
    const navigate = useNavigate();
    const authHeader = useAuthHeader();
    const extractedToken = authHeader();
    const token = extractedToken ? extractedToken.slice(7) : ""

    const [isUploading, setIsUploading] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [generatedVideoFile, setGeneratedVideoFile] = useState<File | null>();

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];

        if (file && file.type.includes('video')) {
            // Update the state with the selected video file
            setSelectedVideo(URL.createObjectURL(file));
            generateVideoFile(file);
        } else {
            // Clear the state if an invalid file is selected
            setSelectedVideo(null);
            showErrorToast('Please select a valid video file.');
            setGeneratedVideoFile(null);
        }
    };

    const generateVideoFile = async (videoBlobUrl: string) => {
        console.log();
        const videoBlob = await fetch(videoBlobUrl).then(r => r.blob());
        const videoFile = new File([videoBlob], "Uploaded Video.mp4", {
            type: "video/mp4"
        });
        console.log(videoFile);
        setGeneratedVideoFile(videoFile);
    };

    const uploadNewVideo = async (e: any) => {
        e.preventDefault();
        setIsUploading(true);
        if (!selectedVideo) {
            showErrorToast("No video uploaded!");
            setIsUploading(false);
        } else if (token === "") {
            showErrorToast("Login to contribute text!");
            setIsUploading(false);
        } else {
            try {
                const response = await axios.post(
                    `https://sign-language-gc07.onrender.com/api/main/videos/upload_video`,
                    { video_file: generatedVideoFile },
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `${token}`
                        }
                    }
                );
                if (response?.status === 200) {
                    setIsUploading(false);
                    setShowUploadVideoDialog(false);
                    showSuccessToast("video uploaded Successfully");
                    setToggleRefetchItemsNow(!toggleRefetchItemsNow);
                }
            } catch (error: any) {
                setIsUploading(false);
                if (error.response.status === 401) {
                    showErrorToast("Session Expired!");
                    navigate("/login");
                    signOut();
                } else {
                    showErrorToast("Error, Try again later");
                }
                console.error(error);
            }
        }
    };

    return (
        <div className="w-screen h-screen top-0 bottom-0 left-0 right-0 mt-0 m-auto fixed z-50 bg-transparent-black flex justify-center items-center">
            {!isUploading ? (
                <div className=" rounded-lg bg-white py-4 w-11/12 sm:w-[400px] space-y-2">
                    <div className="flex items-center justify-between px-6">
                        <p className=" font-semibold text-xl">Upload New Video
                        </p>
                        <button
                            onClick={() => {
                                setShowUploadVideoDialog(false);
                            }}
                            className="font-semibold text-2xl hover:text-custom-blue active:text-custom-blue">
                            x
                        </button>
                    </div>
                    <hr />
                    <div className="px-6 space-y-4 box-border">
                        <p className="text-[#959595]">
                            Please upload only one video at a time.
                        </p>
                        <div className="">
                            <div className="h-[176px] flex items-center justify-center bg-black text-white mb-4">
                                {
                                    selectedVideo ? <video src={selectedVideo} className="w-full " playsInline controls ></video> :
                                        <p className="text-center ">No video Uploaded yet</p>
                                }
                            </div>
                            <input type="file"
                                className="w-full border focus:border-custom-blue rounded-md"
                                accept="video/*"
                                multiple={false}
                                name="selectedVideo" onChange={handleFileChange} />
                        </div>
                        <div className="flex justify-between items-center font-medium">
                            <button
                                onClick={() => {
                                    setShowUploadVideoDialog(false);


                                }}
                                className="px-4 md:px-6 py-2 flex items-center gap-1 rounded-md bg-[#f4f4f4] md:hover:bg-[#d2d2d2] transition-all duration-300 ">
                                Cancel
                            </button>
                            <button
                                onClick={uploadNewVideo}
                                className="px-4 md:px-6 py-2 flex items-center gap-0.5 rounded-md text-white bg-custom-blue md:hover:bg-[#d2d2d2] md:hover:text-black active:bg-[#d2d2d2] active:text-black transition-all duration-300 ">
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-[374px] rounded-lg bg-white w-11/12 sm:w-[400px] flex items-center justify-center gap-2 text-custom-blue">
                    <MoonLoader color="#1759da" size={30} speedMultiplier={0.8} />{" "}
                    <span>please wait </span>
                </div>
            )}
        </div>
    );
};

export default UploadVideoContainer;
