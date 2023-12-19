import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { toast } from "react-toastify";
import VideoContainerSkeleton from "../../Components/VideoContainerSkeleton";
import VideoContainerComponent from "../../Components/VideoContainerComponent";
import LoadingPage from "../../Components/LoadingPage";
import ConfirmDeleteDialog from "../../Components/ConfirmDeleteDialog";
import VideoPlayerDialog from "../../Components/VideoPlayerDialog";
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

const DashboardViewTextVideos = () => {
  const { sentenceId } = useParams();
  const navigate = useNavigate();

  const authString = sessionStorage.getItem("auth") || "";
  const auth = authString ? JSON.parse(authString) : null;
  const token = auth.token || "";

  const [textInfo, setTextInfo] = useState<{
    editor: string;
    video_count: number;
    sentence: string;
  } | null>();
  const [isFetching, setIsFetching] = useState(true);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [toggleRefetchItemsNow, setToggleRefetchItemsNow] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

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

  const fetchTextInfo = async () => {
    try {
      const response = await axios.get(
        `https://sign-language-gc07.onrender.com/api/main/getSpecificString?id=${sentenceId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`
          }
        }
      );
      if (response.status === 200) {
        console.log(response);
        setTextInfo(response?.data?.data);
      }
      setIsFetching(false);
    } catch (error: any) {
      console.log(error);

      if (error.response.status === 401) {
        showErrorToast("Session Expired!");
        navigate("/login");
        sessionStorage.setItem("auth", JSON.stringify({}));
      } else {
        showErrorToast("Error, Try again later");
      }
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTextInfo();
  }, []);

  const fetchVideos = async (pageParam: number) => {
    const pageNumb = pageParam - 1;
    const response = await axios.get(
      `${baseUrl}/api/main/fetchVideos?id=${sentenceId}&page=${pageNumb}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`
        }
      }
    );
    console.log(response);
    return response.data.data;
  };

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, status } =
    useInfiniteQuery(
      [toggleRefetchItemsNow],
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
    <div>
      {showDeleteDialog && (
        <ConfirmDeleteDialog
          mediaId={videoLink}
          setMediaId={setVideoLink}
          setShowDeleteDialog={setShowDeleteDialog}
          showSuccessToast={showSuccessToast}
          showErrorToast={showErrorToast}
          setToggleRefetchItemsNow={setToggleRefetchItemsNow}
          toggleRefetchItemsNow={toggleRefetchItemsNow}
          mediaType="video"
        />
      )}
      {showVideoPlayer && (
        <VideoPlayerDialog
          videoLink={videoLink}
          setVideoLink={setVideoLink}
          setShowVideoPlayer={setShowVideoPlayer}
        />
      )}
      {isFetching ? (
        <LoadingPage />
      ) : (
        <>
          <div className="mb-4 md:mb-6 space-y-4 md:flex md:justify-between items-start">
            <div className="space-y-1 ">
              <h1 className="font-medium text-2xl font-[Rowdies] ">
                Text Information
              </h1>
              <p className="text-base text-[#959595]">
                Author: {textInfo?.editor}
              </p>
              <p className="text-base text-[#959595]">
                Text: {textInfo?.sentence!}
              </p>
            </div>
            <div className=" float-left px-4 py-2 font-medium text-sm sm:text-base bg-custom-blue w-fit rounded-md text-white flex gap-2 items-center transition-all duration-300 flex-nowrap whitespace-nowrap h-fit mb-2 md:mb-0">
              {textInfo?.video_count!} Videos
            </div>
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
              data?.pages?.map(page =>
                page.map((datum: any, id: number) =>
                  page.length === id + 1 ? (
                    <VideoContainerComponent
                      ref={lastCollectionRef}
                      key={id}
                      datum={datum}
                      setShowDeleteDialog={setShowDeleteDialog}
                      setShowVideoPlayer={setShowVideoPlayer}
                      setVideoLink={setVideoLink}
                    />
                  ) : (
                    <VideoContainerComponent
                      key={id}
                      datum={datum}
                      setShowDeleteDialog={setShowDeleteDialog}
                      setShowVideoPlayer={setShowVideoPlayer}
                      setVideoLink={setVideoLink}
                    />
                  )
                )
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardViewTextVideos;
