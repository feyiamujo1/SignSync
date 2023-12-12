import { useState } from "react";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import { RiUploadCloudFill } from "react-icons/ri";

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

const ContributeText = () => {
  const [newSentence, setNewSentence] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const authString = sessionStorage.getItem("auth") || "";
  const auth = authString ? JSON.parse(authString) : null;
  const token = auth.token || "";

  const handleTextChange = (event: any) => {
    const inputText = event.target.value;
    setNewSentence(inputText);
  };

  const uploadNewText = async (e: any) => {
    e.preventDefault();
    setIsUploading(true);
    if (newSentence === "") {
      toast.error("Please input sentence!", {
        progressStyle: errorProgressStyle,
        style: errorToastStyle,
        position: "top-right",
        autoClose: 3000
      });
      setIsUploading(false);
    } else if (token === "") {
      toast.error("Login to contribute text!", {
        progressStyle: errorProgressStyle,
        style: errorToastStyle,
        position: "top-right",
        autoClose: 3000
      });
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
          // Handle success for each updated number
          toast.success("Sentence uploaded Successfully", {
            position: "top-right",
            progressStyle: successProgressStyle,
            style: successToastStyle,
            autoClose: 3000
          });
          setIsUploading(false);
          setNewSentence("");
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
  };
  return (
    <div className="relative w-full overflow-hidden">
      <Navbar />
      <div className="w-[90%] mx-auto pt-24">
        <h1 className="font-medium text-2xl mb-1 font-[Rowdies] ">
          Add your text to our sentence database
        </h1>
        <p className="text-[#959595] ">
          All text submitted here will undergo review, and if found suitable, it
          will be incorporated into our database. Please be sure to adhere to
          the provided instructions when contributing your text:
        </p>
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-10">
          <div className=" md:max-w-[400px] text-[#959595]">
            <ul className=" list-decimal ml-4">
              <li>Utilize only the English language.</li>
              <li>
                Aim for natural, conversational language suitable for a student
                classroom.
              </li>
              <li>Keep sentences under 120 characters.</li>
              <li>Ensure correct grammar usage.</li>
              <li>Employ accurate spelling and punctuation.</li>
              <li>Avoid special characters and foreign letters.</li>
              <li>Provide proper citations for content.</li>
              <li>Ensure sentences are easily readable.</li>
            </ul>
          </div>
          <div className="w-full md:mt-3 mb-20 md:mb-0">
            <textarea
              // rows={12}
              value={newSentence}
              onChange={handleTextChange}
              // disabled={countWords() > 20}
              maxLength={120}
              placeholder="Type your text here..."
              className={`w-full rounded-md h-[200px] border focus:outline-2 focus:outline-custom-blue m-1 p-4  transition-all duration-300 ${
                newSentence.length === 120 &&
                "focus:outline-red-500 outline-red-500"
              }`}></textarea>
            <p className={` text-right text-red-500`}>
              {newSentence.length === 120 && "Max word reached"}
            </p>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                disabled={isUploading}
                onClick={uploadNewText}
                className={`shadow-custom-stuff flex gap-2 items-center justify-center px-3 py-1.5 rounded-md font-semibold text-lg bg-custom-blue text-white active:bg-[#d2d2d2] active:text-black md:hover:text-black  md:hover:bg-[#d2d2d2] transition-all duration-300 w-[109px] h-[40px] disabled:bg-[#d2d2d2]`}>
                {isUploading ? (
                  <MoonLoader color="#000" size={20} />
                ) : (
                  <>
                    Submit <RiUploadCloudFill />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributeText;
