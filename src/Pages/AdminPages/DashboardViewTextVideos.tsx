import { useParams } from "react-router-dom";
import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { toast } from "react-toastify";
import VideoContainerSkeleton from "../../Components/VideoContainerSkeleton";
import VideoContainerComponent from "../../Components/VideoContainerComponent";
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

  const authString = sessionStorage.getItem("auth") || "";
  const auth = authString ? JSON.parse(authString) : null;
  const token = auth.token || "";

  // @ts-ignore
  const [videoId, setVideoId] = useState("");

// @ts-ignore
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // @ts-ignore
  const [toggleRefetchItemsNow, setToggleRefetchItemsNow] = useState(false);
  // @ts-ignore
  const [videoLink, setVideoLink] = useState("");
  // @ts-ignore
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  // @ts-ignore
  const showSuccessToast = (message: string) => {
    toast.success(message, {
      position: "top-right",
      progressStyle: successProgressStyle,
      style: successToastStyle,
      autoClose: 3000
    });
  };

  // @ts-ignore
  const showErrorToast = (message: string) => {
    toast.error(message, {
      position: "top-right",
      progressStyle: errorProgressStyle,
      style: errorToastStyle,
      autoClose: 3000
    });
  };

  const fetchQuestions = async (pageParam: number) => {
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
      ["/videos", toggleRefetchItemsNow],
      ({ pageParam = 1 }) => fetchQuestions(pageParam),
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
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div>
          <h1 className="font-medium text-2xl font-[Rowdies] ">
            Video Directory
          </h1>
          <p className="text-xs md:text-base text-[#959595]">
            View all videos for selected text -
          </p>
        </div>
        <div className="px-4 py-2 font-medium text-sm sm:text-base bg-custom-blue w-fit rounded-md text-white flex gap-2 items-center transition-all duration-300 flex-nowrap whitespace-nowrap">
          {data?.pages.length} Videos
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
                  setVideoId={setVideoId}
                  setShowDeleteDialog={setShowDeleteDialog}
                  setShowVideoPlayer={setShowVideoPlayer}
                  setVideoLink={setVideoLink}
                />
              ) : (
                <VideoContainerComponent
                  key={id}
                  datum={datum}
                  setVideoId={setVideoId}
                  setShowDeleteDialog={setShowDeleteDialog}
                  setShowVideoPlayer={setShowVideoPlayer}
                  setVideoLink={setVideoLink}
                />
              )
            )
          )}
      </div>
    </div>
  );
};

export default DashboardViewTextVideos;
