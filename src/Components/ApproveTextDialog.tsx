import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
const baseUrl = "https://sign-language-gc07.onrender.com";

const ApproveTextDialog = ({
  setApprovedText,
  sentenceId,
  setSentenceId,
  showErrorToast,
  showSuccessToast,
  setToggleRefetchItemsNow,
  toggleRefetchItemsNow
}: {
  setApprovedText: Function;
  sentenceId: string;
  setSentenceId: Function;
  showErrorToast: Function;
  showSuccessToast: Function;
  setToggleRefetchItemsNow: Function;
  toggleRefetchItemsNow: boolean;
}) => {
  const navigate = useNavigate();
  const auth = JSON.parse(sessionStorage.getItem("auth") || "{}");
  const token = auth.token || "";

  const [isUploading, setIsUploading] = useState(false);

  const UpdateSentence = async () => {
    setIsUploading(true);
    try {
      const response = await axios.put(
        `${baseUrl}/api/main/updateString?id=${sentenceId}`,
        {
          "verified": true,
        },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status === 200) {
        setIsUploading(false);
        setApprovedText(false);
        showSuccessToast("Sentence updated successfully");
        setToggleRefetchItemsNow(!toggleRefetchItemsNow);
      }
    } catch (error: any) {
      setIsUploading(false);
      console.log(error);
      
      if (error.response.status === 401){
        showErrorToast("Session Expired!");
        sessionStorage.setItem('auth', JSON.stringify({}));
        navigate("/login");
      }else{
        showErrorToast("Error, Try again later");
      }
    }
  };
  return (
    <div className="w-screen h-screen top-0 bottom-0 left-0 right-0 m-auto fixed z-50 bg-transparent-black flex justify-center items-center">
      {!isUploading ? (
        <div className=" rounded-lg bg-white py-4 w-11/12 sm:w-[400px] space-y-2">
          <div className="flex items-center justify-between px-6">
            <p className=" font-semibold text-xl">Approve Text</p>
            <button
              onClick={() => {
                setApprovedText(false);
                setSentenceId("");
              }}
              className="font-semibold text-2xl hover:text-custom-blue active:text-custom-blue">
              x
            </button>
          </div>
          <hr />
          <div className="px-6 space-y-6">
            <p className="text-[#959595]">
              Are you sure you want to approve this sentence?
            </p>
            <div className="flex justify-between items-center font-medium">
              <button
                onClick={() => {
                  setApprovedText(false);
                  setSentenceId("");
                }}
                className="px-4 md:px-6 py-2 flex items-center gap-1 rounded-md bg-[#f4f4f4] md:hover:bg-[#d2d2d2] transition-all duration-300 ">
                Cancel
              </button>
              <button
                onClick={UpdateSentence}
                className="px-4 md:px-6 py-2 flex items-center gap-0.5 rounded-md text-white bg-custom-blue md:hover:bg-[#d2d2d2] md:hover:text-black active:bg-[#d2d2d2] active:text-black transition-all duration-300 ">
                Approve
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[169px] rounded-lg bg-white w-11/12 sm:w-[400px] flex items-center justify-center gap-2 text-custom-blue">
          <MoonLoader color="#1759da" size={30} speedMultiplier={0.8} />{" "}
          <span>Please wait </span>
        </div>
      )}
    </div>
  );
};

export default ApproveTextDialog;
