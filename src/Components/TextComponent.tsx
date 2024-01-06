// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import { TiArrowBack, TiArrowForward } from "react-icons/ti";
import { useEffect, useRef } from "react";

// import required modules
import { Pagination, EffectCreative } from "swiper/modules";
import { MoonLoader } from "react-spinners";

const TextComponent = ({
  questions,
  currentQuestionPosition,
  setCurrentQuestionPosition,
  isUploading,
  isUploadingStatus,
  setIsUploadingStatus,
  loadingNextPage,
  error
}: {
  currentQuestionPosition: number;
  setCurrentQuestionPosition: Function;
  questions: { _id: string; sentence: string }[];
  isUploading: boolean;
  isUploadingStatus: string;
  setIsUploadingStatus: Function;
  loadingNextPage: boolean;
  error: string;
}) => {
  const textSliderRef = useRef<any>(null);

  const handleGoToNext = () => {
    if (currentQuestionPosition < questions.length - 1) {
      textSliderRef.current.slideNext();
      setCurrentQuestionPosition((prev: number) => prev + 1);
    }
  };

  const handleGotToPrevious = () => {
    if (currentQuestionPosition > 0) {
      textSliderRef.current.slidePrev();
      setCurrentQuestionPosition((prev: number) => prev - 1);
    }
  };

  useEffect(() => {
    if (isUploadingStatus === "Success" && !loadingNextPage) {
      handleGoToNext();
      setIsUploadingStatus("");
    } else {
      setIsUploadingStatus("");
    }
  }, [isUploadingStatus]);

  return (
    <div className={` portrait:w-full w-1/2 ${loadingNextPage && "mr-4"}`}>
      <h1 className="font-medium text-lg md:text-2xl mb-1 font-[Rowdies]">
        Texts for translation
      </h1>
      <p className="text-[#959595] mb-8">
        The texts below featuring content commonly found in a student's
        classroom requires sign language translation.
      </p>
      {loadingNextPage ? (
        <div className=" aspect-video flex flex-col items-center justify-center shadow-custom-stuff rounded-md">
          <MoonLoader color="#000" size={30} />
          <p>Loading text ...</p>
        </div>
      ) : (
        <div className=" aspect-video">
          <Swiper
            ref={textSliderRef}
            grabCursor={false}
            allowTouchMove={false}
            pagination={{
              type: "progressbar"
            }}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400]
              },
              next: {
                translate: ["100%", 0, 0]
              }
            }}
            modules={[Pagination, EffectCreative]}
            onBeforeInit={swiper => {
              textSliderRef.current = swiper;
            }}
            className=" aspect-video shadow-custom-stuff rounded-md box-border">
            {questions?.length === 0 && error === "" ? (
              <SwiperSlide className=" bg-white flex justify-center items-center h-full w-full rounded-md">
                <div className=" w-full h-full flex flex-col items-center justify-center shadow-custom-stuff rounded-md">
                  <p className="text-[#959595]custom-blue">
                    Thanks for participating
                  </p>
                </div>
              </SwiperSlide>
            ) : questions?.length === 0 && error !== "" ? (
              <SwiperSlide className=" bg-white flex justify-center items-center h-full w-full rounded-md">
                <div className=" w-full h-full flex flex-col items-center justify-center shadow-custom-stuff rounded-md">
                  <p className="text-[#959595]custom-blue">{error}</p>
                </div>
              </SwiperSlide>
            ) : (
              questions.map((question, id) => (
                <SwiperSlide
                  key={id}
                  className=" bg-white flex justify-center items-center h-full w-full rounded-md">
                  <div className="flex justify-center items-center h-full w-full relative">
                    <p className="text-xl md:text-2xl text-center h-fit line-clamp-4 p-2">
                      {question?.sentence}
                      {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi assumenda optio mollitia cum aperiam dolore itaque, labore et qui laborum nostrum adipisci tempore, fugit numquam vel, veniam maxime eius aut. */}
                    </p>
                    <p className=" px-2 py-0.5 text-xs bg-custom-blue rounded-full fixed top-4 left-4 text-white">
                      {id + 1}
                    </p>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      )}
      <div className="mt-7 w-full flex justify-between gap-4 items-center">
        <button
          disabled={
            currentQuestionPosition === 0 ||
            loadingNextPage ||
            questions?.length === 0
          }
          onClick={handleGotToPrevious}
          className={`shadow-custom-stuff flex gap-2 items-center px-2.5 text-lg py-1.5 rounded-md md:font-semibold md:hover:font-medium bg-[#d2d2d2] active:bg-custom-blue active:text-white md:hover:text-white md:hover:bg-[#4675cf] transition-all duration-300 disabled:bg-[#f3f2f1] disabled:hover:bg-[#f3f2f1] disabled:text-[#adae95] disabled:hover:text-[#adae95]  ${
            isUploading && " pointer-events-none"
          }`}>
          <span>
            <TiArrowBack />
          </span>{" "}
          <span>Previous</span>
        </button>
        <button
          disabled={
            currentQuestionPosition === questions.length - 1 ||
            loadingNextPage ||
            questions?.length === 0
          }
          onClick={handleGoToNext}
          className={`shadow-custom-stuff flex gap-2 items-center px-6 text-lg py-1.5 rounded-md md:font-semibold md:hover:font-medium bg-[#d2d2d2] active:bg-custom-blue active:text-white md:hover:text-white md:hover:bg-[#4675cf] transition-all duration-300 disabled:bg-[#f3f2f1] disabled:hover:bg-[#f3f2f1] disabled:text-[#adae95] disabled:hover:text-[#adae95] ${
            isUploading && " pointer-events-none"
          }`}>
          <span>Next</span>{" "}
          <span>
            <TiArrowForward />
          </span>
        </button>
      </div>
    </div>
  );
};

export default TextComponent;
