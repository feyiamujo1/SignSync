import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const baseUrl = "https://sign-language-gc07.onrender.com";

const EditTextContainer = ({
  sentenceId,
  setSentenceId,
  showErrorToast,
  showSuccessToast,
  setShowEditTextDialog,
  setToggleRefetchItemsNow,
  toggleRefetchItemsNow,
  newSentence,
  setNewSentence
}: {
  sentenceId: string;
  setSentenceId: Function;
  showErrorToast: Function;
  showSuccessToast: Function;
  setShowEditTextDialog: Function;
  setToggleRefetchItemsNow: Function;
  toggleRefetchItemsNow: boolean;
  newSentence: string;
  setNewSentence: Function;
}) => {
  const navigate = useNavigate();
  const auth = JSON.parse(sessionStorage.getItem("auth") || "");
  const token = auth.token || "";

  const [isUploading, setIsUploading] = useState(false);

  const handleTextChange = (event: any) => {
    const inputText = event.target.value;
    setNewSentence(inputText);
  };

  const uploadNewSentence = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);
    if (newSentence === "") {
      showErrorToast("Please input sentence!");
      setIsUploading(false);
    } else if (token === "") {
      showErrorToast("Login to contribute text!");
      setIsUploading(false);
    } else {
      try {
        const response = await axios.post(
          `https://sign-language-gc07.onrender.com//api/main/addString`,
          { sentence: newSentence },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`
            }
          }
        );
        if (response?.status === 200) {
          setSentenceId("");
          setNewSentence("");
          setIsUploading(false);
          setShowEditTextDialog(false);
          showSuccessToast("Sentence uploaded Successfully");
          setToggleRefetchItemsNow(!toggleRefetchItemsNow);
        }
      } catch (error: any) {
        setIsUploading(false);
        if (error?.status === 401){
          showErrorToast("Session Expired!");
          navigate("/login");
          sessionStorage.setItem('auth', JSON.stringify({}));
        }else{
          showErrorToast("Error, Try again later");
        }
        console.error(error);
      }
    }
  };

  const UpdateSentence = async () => {
    setIsUploading(true);
    if (newSentence === "") {
      showErrorToast("Please input sentence!");
      setIsUploading(false);
    } else if (token === "") {
      showErrorToast("Login to contribute text!");
      setIsUploading(false);
    } else {
      try {
        const response = await axios.put(
          `${baseUrl}/api/main/updateString?id=${sentenceId}`,
          {
            sentence: newSentence
          },
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        if (response.status === 200) {
          setSentenceId("");
          setNewSentence("");
          setIsUploading(false);
          showSuccessToast("Sentence updated successfully");
          setToggleRefetchItemsNow(!toggleRefetchItemsNow);
        }
      } catch (error: any) {
        setIsUploading(false);
        if (error.status === 401){
          showErrorToast("Session Expired!");
          sessionStorage.setItem('auth', JSON.stringify({}));
          navigate("/login");
        }else{
          showErrorToast("Error, Try again later");
        }
      }
    }
  };
  return (
    <div className="w-screen h-screen top-0 bottom-0 left-0 right-0 mt-0 m-auto fixed z-50 bg-transparent-black flex justify-center items-center">
      {!isUploading ? (
        <div className=" rounded-lg bg-white py-4 w-11/12 sm:w-[400px] space-y-2">
          <div className="flex items-center justify-between px-6">
            <p className=" font-semibold text-xl">
              {sentenceId === "" ? "Add New Sentence" : "Update Sentence"}
            </p>
            <button
              onClick={() => {
                setShowEditTextDialog(false);
                setSentenceId("");
                setNewSentence("");
              }}
              className="font-semibold text-2xl hover:text-custom-blue active:text-custom-blue">
              x
            </button>
          </div>
          <hr />
          <div className="px-6 space-y-6 box-border">
            <p className="text-[#959595]">
              Please {sentenceId === "" ? "enter" : "edit"} the text below and
              remember to save it for{" "}
              {sentenceId === ""
                ? " uploading a new sentence"
                : "updating sentence"}
              .
            </p>
            <div className="">
            <textarea
              value={newSentence}
              onChange={handleTextChange}
              maxLength={120}
              placeholder="Type your text here..."
              className={`w-full rounded-md h-[150px] border focus:border-2 focus:border-custom-blue p-4  transition-all duration-300 ${
                newSentence.length === 120 &&
                "focus:border-red-500 border-red-500"
              }`}></textarea>
            <p className={` text-right text-red-500 mt-2 text-sm`}>
              {newSentence.length === 120 && "Max word reached"}
            </p>
            </div>
            <div className="flex justify-between items-center font-medium">
              <button
                onClick={() => {
                  setShowEditTextDialog(false);
                  setSentenceId("");
                  setNewSentence("");
                }}
                className="px-4 md:px-6 py-2 flex items-center gap-1 rounded-md bg-[#f4f4f4] md:hover:bg-[#d2d2d2] transition-all duration-300 ">
                Cancel
              </button>
              <button
                onClick={sentenceId === "" ? uploadNewSentence : UpdateSentence}
                className="px-4 md:px-6 py-2 flex items-center gap-0.5 rounded-md text-white bg-custom-blue md:hover:bg-[#d2d2d2] md:hover:text-black active:bg-[#d2d2d2] active:text-black transition-all duration-300 ">
                Save
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

export default EditTextContainer;
