import { useEffect } from "react";

const Timer = ({
  countdown,
  setCountdown,
  counterState
}: {
  countdown: number;
  setCountdown: Function;
  counterState: string;
}) => {
  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timerId);
    }
  }, [countdown]);

  return (
    <div className="">
      {countdown > 0 && (
        <div className="text-center space-y-1">
          <p className="text-white font-semibold">
            <span>Recording will</span> <span>{counterState}</span>{" "}
            <span>in:</span>
          </p>
          <p className="text-white text-4xl md:text-6xl "><span>{countdown}</span></p>
        </div>
      )}
    </div>
  );
};

export default Timer;
