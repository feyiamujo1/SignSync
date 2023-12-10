const TextContainerSkeleton = () => {
  return (
    <div className="rounded-md shadow-custom-stuff p-3.5 relative space-y-4">
      <div className="w-full p-2 bg-[#d1d1d1] h-[170px] flex items-center text-center rounded-sm relative animate-pulse "></div>
      <hr />
      <div className="space-y-3">
        <p className="text-sm text-[#d1d1d1] flex gap-1 items-center h-4 w-2/4 animate-pulse bg-[#d1d1d1]">
          
        </p>
        <div className="flex justify-between items-center font-medium ">
          <div className="h-10 w-[100px] animate-pulse bg-[#d1d1d1] rounded-md"></div>
          <div className="h-10 w-[120px] animate-pulse bg-[#d1d1d1] rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default TextContainerSkeleton;
