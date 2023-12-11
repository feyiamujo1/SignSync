import { useParams } from "react-router-dom";

const DashboardViewTextVideos = () => {
  const { sentenceId, videoCount } = useParams();
  console.log(sentenceId, videoCount)
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
        <div className="px-4 py-2 font-medium text-sm md:text-base bg-custom-blue w-fit rounded-md text-white flex gap-2 items-center transition-all duration-300 flex-nowrap whitespace-nowrap">
          {videoCount} Videos
        </div>
      </div>
    </div>
  );
};

export default DashboardViewTextVideos;
