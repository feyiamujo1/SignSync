import { useEffect, useState } from "react";

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

  function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const initialLanguage =
    getCookie("googtrans") !== "" ? getCookie("googtrans").slice(-2) : "en";

  // @ts-ignore
  const [language, setLanguage] = useState(initialLanguage);

  return (
    <div className="">
      {countdown > 0 && (
        <div className="text-center space-y-1 mb-1 md:mb-0 ">
          <p className="text-white text-sm md:text-base font-semibold" translate="no">
            {language === "fr"
              ? `L'enregistrement ${
                  counterState === "start"
                    ? "commencera"
                    : counterState === "stop"
                    ? "s'arrêtera"
                    : "commencera"
                } dans:`
              : `Recording will ${counterState} in:`}
          </p>
          {/* <p className="text-white font-semibold" translate="no">
            Recording will {counterState} in :
          </p> */}
          <p className="text-white text-3xl md:text-6xl " translate="no">
            {countdown}
          </p>
        </div>
      )}
    </div>
  );
};

export default Timer;
