import { useEffect } from "react";

const Timer = ({countdown, setCountdown, counterState}: {countdown: number, setCountdown: Function, counterState: string}) => {

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
        <div className="text-center">
          <p className="text-white font-semibold">Recording will {counterState} in:</p>
          <p className="text-white text-6xl ">{countdown}</p>
        </div>
      )}
    </div>
  );
};

export default Timer;
