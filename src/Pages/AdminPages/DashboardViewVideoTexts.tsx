import { useParams } from "react-router-dom";
import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { toast } from "react-toastify";
import VideoContainerSkeleton from "../../Components/VideoContainerSkeleton";
import ConfirmDeleteDialog from "../../Components/ConfirmDeleteDialog";
import VideoPlayerDialog from "../../Components/VideoPlayerDialog";
import { useAuthHeader } from "react-auth-kit";
import VideoTextComponent from "../../Components/VideoTextComponent";
const baseUrl = "https://sign-language-gc07.onrender.com";

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

const DashboardViewVideoTexts = () => {
  const { videoId } = useParams();
  console.log()

  const authHeader = useAuthHeader();
  const extractedToken = authHeader();
  const token = extractedToken ? extractedToken.slice(7) : ""

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [toggleRefetchItemsNow, setToggleRefetchItemsNow] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [sentenceId, setSentenceId] = useState("");

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


  const fetchVideosText = async (pageParam: number) => {

    const pageNumb = pageParam;
    console.log(pageNumb);
    console.log(`${baseUrl}/api/main/videos/fetchTexts?page=${pageNumb}&id=${videoId}`,)
    const response = await axios.get(
      `${baseUrl}/api/main/videos/fetchTexts?page=${pageNumb}&id=${videoId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`
        }
      }
    );
    console.log(response.data?.data);
    return response?.data?.data;
  };

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, status } =
    useInfiniteQuery(
      [toggleRefetchItemsNow],
      ({ pageParam = 1 }) => fetchVideosText(pageParam),
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
    <div>
      {showDeleteDialog && (
        <ConfirmDeleteDialog
          mediaId={`${videoId} ${sentenceId}`}
          setMediaId={setSentenceId}
          setShowDeleteDialog={setShowDeleteDialog}
          showSuccessToast={showSuccessToast}
          showErrorToast={showErrorToast}
          setToggleRefetchItemsNow={setToggleRefetchItemsNow}
          toggleRefetchItemsNow={toggleRefetchItemsNow}
          mediaType="Custom Video Sentence"
        />
      )}
      {showVideoPlayer && (
        <VideoPlayerDialog
          videoLink={videoLink}
          setVideoLink={setVideoLink}
          setShowVideoPlayer={setShowVideoPlayer}
        />
      )}
      <>
        <div className="mb-4 md:mb-6 space-y-4 md:flex md:justify-between items-start">
          <div className="space-y-1 ">
            <h1 className="font-medium text-2xl font-[Rowdies] ">
              Text Information
            </h1>
            <p className="text-base text-[#959595]">
              Text uploaded for this video are listed below
            </p>
            <p className="text-base text-[#959595]">
              {/* Text: {textInfo?.sentence!} */}
            </p>
          </div>
          {/* <div className=" float-left px-4 py-2 font-medium text-sm sm:text-base bg-custom-blue w-fit rounded-md text-white flex gap-2 items-center transition-all duration-300 flex-nowrap whitespace-nowrap h-fit mb-2 md:mb-0">
            {textInfo?.video_count!} Videos
          </div> */}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
          {status !== "loading" && !data && (
            <div className=" md:col-span-3 h-[300px] flex justify-center items-center text-center text-[#959595]">
              <p>Items not found</p>
            </div>
          )}
          {status === "loading" &&
            [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <VideoContainerSkeleton key={item} />
            ))}
          {status === "success" &&
            data?.pages?.map((page, index) =>
              page.length === 0 && index === 0 ?
                <div className="w-full h-[200px] col-span-1 sm:col-span-2 md:col-span-3 flex items-center justify-center">
                  <p className="text-[#939393] ">No new text available !!!</p>
                </div> :
                page.map((datum: any, id: number) =>
                  page.length === id + 1 ? (
                    <VideoTextComponent
                      ref={lastCollectionRef}
                      key={id}
                      datum={datum}
                      setShowDeleteDialog={setShowDeleteDialog}
                      setSentenceId={setSentenceId}
                    />
                  ) : (
                    <VideoTextComponent
                      key={id}
                      datum={datum}
                      setShowDeleteDialog={setShowDeleteDialog}
                      setSentenceId={setSentenceId}
                    />
                  )
                )
            )}
        </div>
      </>
    </div>
  );
};

export default DashboardViewVideoTexts;
