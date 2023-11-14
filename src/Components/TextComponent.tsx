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

const TextComponent = ({
  questions,
  currentQuestionPosition,
  setCurrentQuestionPosition,
  isUploading,
  isUploadingStatus,
  setIsUploadingStatus
}: {
  currentQuestionPosition: number;
  setCurrentQuestionPosition: Function;
  questions: { id: string; sentence: string }[];
  isUploading: boolean;
  isUploadingStatus: string;
  setIsUploadingStatus: Function
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
    if (isUploadingStatus === "Success"){
      handleGoToNext();
      setIsUploadingStatus("");
    }
  }, [isUploadingStatus])
  
  return (
    <div className="md:w-1/2">
      <h1 className="font-medium text-2xl mb-1 font-[Rowdies]">
        Texts for translation
      </h1>
      <p className="text-[#959595] mb-8">
        The texts below featuring content commonly found in a student's
        classroom requires sign language translation.
      </p>
      <div className="">
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
          className="h-[350px] shadow-custom-stuff rounded-md">
          {questions.map((question, id) => (
            <SwiperSlide
              key={id}
              className=" bg-white p-5 flex justify-center items-center h-full w-full rounded-md">
              <div className="flex justify-center items-center h-full w-full relative">
                <p className="text-xl md:text-2xl text-center h-fit">
                  {question?.sentence}
                </p>
                <p className=" px-2 py-0.5 text-xs bg-custom-blue rounded-full fixed top-4 left-4 text-white">
                  {id + 1}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-7 w-full flex justify-between gap-4 items-center">
        <button
          disabled={currentQuestionPosition === 0}
          onClick={handleGotToPrevious}
          className={`shadow-custom-stuff flex gap-2 items-center px-2.5 text-lg py-1.5 rounded-md md:font-semibold md:hover:font-medium bg-[#d2d2d2] active:bg-[#314aca] active:text-white md:hover:text-white md:hover:bg-[#4675cf] transition-all duration-300 disabled:bg-[#f3f2f1] disabled:hover:bg-[#f3f2f1] disabled:text-[#adae95] disabled:hover:text-[#adae95]  ${isUploading && " pointer-events-none"}`}>
          <TiArrowBack /> Previous
        </button>
        <button
          disabled={currentQuestionPosition === questions.length - 1}
          onClick={handleGoToNext}
          className={`shadow-custom-stuff flex gap-2 items-center px-6 text-lg py-1.5 rounded-md md:font-semibold md:hover:font-medium bg-[#d2d2d2] active:bg-[#314aca] active:text-white md:hover:text-white md:hover:bg-[#4675cf] transition-all duration-300 disabled:bg-[#f3f2f1] disabled:hover:bg-[#f3f2f1] disabled:text-[#adae95] disabled:hover:text-[#adae95] ${isUploading && " pointer-events-none"}`}>
          Next <TiArrowForward />
        </button>
      </div>
    </div>
  );
};

export default TextComponent;
