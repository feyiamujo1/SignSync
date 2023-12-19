import { AiFillEdit } from "react-icons/ai";
import { useCallback, useRef, useState } from "react";
import TextContainer from "../../Components/TextContainer";
import TextContainerSkeleton from "../../Components/TextContainerSkeleton";
import { toast } from "react-toastify";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import ConfirmDeleteDialog from "../../Components/ConfirmDeleteDialog";
import EditTextContainer from "../../Components/EditTextContainer";
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

const DashboardHome = () => {
  const [sentenceId, setSentenceId] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditTextDialog, setShowEditTextDialog] = useState(false);
  const [toggleRefetchItemsNow, setToggleRefetchItemsNow] = useState(false);
  const [newSentence, setNewSentence] = useState("");
  // @ts-ignore
  const [approveText, setApprovedText] = useState(false);

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

  const fetchQuestions = async (pageParam: number) => {
    const pageNumb = pageParam - 1;
    const response = await axios.get(
      `${baseUrl}/api/main/fetchStrings/admin?page=${pageNumb}&verified=1`
    );
    console.log(response);
    return response.data.data;
  };

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, status } =
    useInfiniteQuery(
      ["old-setences", toggleRefetchItemsNow],
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
    <div className="">
      {showDeleteDialog && (
        <ConfirmDeleteDialog
          mediaId={sentenceId}
          setMediaId={setSentenceId}
          setShowDeleteDialog={setShowDeleteDialog}
          showSuccessToast={showSuccessToast}
          showErrorToast={showErrorToast}
          setToggleRefetchItemsNow={setToggleRefetchItemsNow}
          toggleRefetchItemsNow={toggleRefetchItemsNow}
          mediaType="sentence"
        />
      )}
      {showEditTextDialog && (
        <EditTextContainer
          sentenceId={sentenceId}
          setSentenceId={setSentenceId}
          showSuccessToast={showSuccessToast}
          showErrorToast={showErrorToast}
          setShowEditTextDialog={setShowEditTextDialog}
          setToggleRefetchItemsNow={setToggleRefetchItemsNow}
          toggleRefetchItemsNow={toggleRefetchItemsNow}
          newSentence={newSentence}
          setNewSentence={setNewSentence}
        />
      )}

      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div>
          <h1 className="font-medium text-2xl font-[Rowdies] ">
            Text Repository
          </h1>
          <p className="text-xs md:text-base text-[#959595]">
            View all approved text and their uploaded videos.
          </p>
        </div>
        <button
          onClick={() => {
            setShowEditTextDialog(true);
          }}
          className="px-4 py-2 font-medium text-sm sm:text-base bg-custom-blue w-fit rounded-md text-white flex gap-2 items-center group active:bg-[#d2d2d2] active:text-black md:hover:text-black  md:hover:bg-[#d2d2d2] transition-all duration-300 flex-nowrap whitespace-nowrap">
          Add Text <AiFillEdit className="text-lg" />
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
          data?.pages?.map(page =>
            page.map((datum: any, id: number) =>
              page.length === id + 1 ? (
                <TextContainer
                  ref={lastCollectionRef}
                  key={id}
                  datum={datum}
                  setSentenceId={setSentenceId}
                  setShowDeleteDialog={setShowDeleteDialog}
                  setNewSentence={setNewSentence}
                  setShowEditTextDialog={setShowEditTextDialog}
                  setApprovedText={setApprovedText}
                />
              ) : (
                <TextContainer
                  key={id}
                  datum={datum}
                  setSentenceId={setSentenceId}
                  setShowDeleteDialog={setShowDeleteDialog}
                  setNewSentence={setNewSentence}
                  setShowEditTextDialog={setShowEditTextDialog}
                  setApprovedText={setApprovedText}
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

export default DashboardHome;
