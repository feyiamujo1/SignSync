import { AiFillEdit } from "react-icons/ai";
import { useCallback, useRef, useState } from "react";
import TextContainerSkeleton from "../../Components/TextContainerSkeleton";
import { toast } from "react-toastify";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { MoonLoader } from "react-spinners";
// import ConfirmDeleteDialog from "../../Components/ConfirmDeleteDialog";
import VideoContainer from "../../Components/VideoContainer";
import { useAuthHeader } from "react-auth-kit";
import UploadVideoContainer from "../../Components/UploadVideoContainer";
import ConfirmDeleteDialog from "../../Components/ConfirmDeleteDialog";

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

const DashboardVideoUpload = () => {
    const authHeader = useAuthHeader();
    const extractedToken = authHeader();
    const token = extractedToken ? extractedToken.slice(7) : ""

    // @ts-ignore
  const [videoId, setVideoId] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUploadVideoDialog, setShowUploadVideoDialog] = useState(false);
  const [toggleRefetchItemsNow, setToggleRefetchItemsNow] = useState(false);

  const showSuccessToast = (message: string) => {
    toast.success(message, {
      position: "top-right",
      progressStyle: successProgressStyle,
      style: successToastStyle,
      autoClose: 3000
    });
  };

  const showErrorToast = (message: string) => {
    toast.error(message, {
      position: "top-right",
      progressStyle: errorProgressStyle,
      style: errorToastStyle,
      autoClose: 3000
    });
  };

  const fetchVideos = async (pageParam: number) => {
    const pageNumb = pageParam;
    console.log(pageNumb)
    const response = await axios.get(
        `https://sign-language-gc07.onrender.com/api/main/videos/admin?page=${pageNumb}`,
        {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json"
            }
        }
    );
    console.log(response);
    return response?.data?.detail?.videos;
  };

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, status } =
    useInfiniteQuery(
      ["old-setences", toggleRefetchItemsNow],
      ({ pageParam = 1 }) => fetchVideos(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.length ? allPages.length + 1 : undefined;
        }
      }
    );

  // This will handle checking if the last collection is in view
  const intObserver = useRef<any>(null);
  const lastCollectionRef = useCallback(
    (collection: any) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver(collections => {
        if (collections[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (collection) intObserver.current.observe(collection);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <div className="">
      {showDeleteDialog && (
        <ConfirmDeleteDialog
          mediaId={videoId}
          setMediaId={setVideoId}
          setShowDeleteDialog={setShowDeleteDialog}
          showSuccessToast={showSuccessToast}
          showErrorToast={showErrorToast}
          setToggleRefetchItemsNow={setToggleRefetchItemsNow}
          toggleRefetchItemsNow={toggleRefetchItemsNow}
          mediaType="Custom Video"
        />
      )}
      {showUploadVideoDialog && (
        <UploadVideoContainer
          showSuccessToast={showSuccessToast}
          showErrorToast={showErrorToast}
          setShowUploadVideoDialog={setShowUploadVideoDialog}
          setToggleRefetchItemsNow={setToggleRefetchItemsNow}
          toggleRefetchItemsNow={toggleRefetchItemsNow}
        />
      )}

      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div>
          <h1 className="font-medium text-2xl font-[Rowdies] ">
            Custom Video Repository
          </h1>
          <p className="text-xs md:text-base text-[#959595]">
            View all custom videos and their corresponding text.
          </p>
        </div>
        <button
          onClick={() => {
            setShowUploadVideoDialog(true);
          }}
          className="px-4 py-2 font-medium text-sm sm:text-base bg-custom-blue w-fit rounded-md text-white flex gap-2 items-center group active:bg-[#d2d2d2] active:text-black md:hover:text-black  md:hover:bg-[#d2d2d2] transition-all duration-300 flex-nowrap whitespace-nowrap">
          Upload Video <AiFillEdit className="text-lg" />
        </button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
        {status !== "loading" && !data && (
          <div className=" md:col-span-3 h-[300px] flex justify-center items-center text-center text-[#959595]">
            <p>Items not found</p>
          </div>
        )}
        {status === "loading" &&
          [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
            <TextContainerSkeleton key={item} />
          ))}
        {status === "success" &&
          data?.pages?.map((page, index) =>
            page.length === 0 && index === 0 ?
              <div className="w-full h-[200px] col-span-1 sm:col-span-2 md:col-span-3 flex items-center justify-center">
                <p className="text-[#939393] ">No new videos available !!!</p>
              </div> :
              page.map((datum: any, id: number) =>
                page.length === id + 1 ? (
                  <VideoContainer
                    ref={lastCollectionRef}
                    key={id}
                    datum={datum}
                    setVideoId={setVideoId}
                    setShowDeleteDialog={setShowDeleteDialog}
                    // setNewSentence={setNewSentence}
                  />
                ) : (
                  <VideoContainer
                    key={id}
                    datum={datum}
                    setVideoId={setVideoId}
                    setShowDeleteDialog={setShowDeleteDialog}
                    // setNewSentence={setNewSentence}
                  />
                )
              )
          )}
      </div>
      {hasNextPage && (
        <div className="h-fit w-full flex items-center justify-center m-auto mt-6">
          <MoonLoader color="#1759da" size={30} speedMultiplier={0.8} />
        </div>
      )}{" "}
    </div>
  );
};

export default DashboardVideoUpload;
