import { useEffect, useRef, useState } from "react";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdCheck,
  MdLanguage
} from "react-icons/md";

const GoogleTranslate = () => {
  const showLanguageTogglerRef = useRef<HTMLDivElement | null>(null);
  const [showLanguageToggler, setShowLanguageToggler] = useState(false);
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
    getCookie("googtrans") !== "" ? getCookie("googtrans").slice(-2) : "";
  console.log(initialLanguage);

  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showLanguageTogglerRef.current &&
        !showLanguageTogglerRef.current.contains(event.target as Node)
      ) {
        setShowLanguageToggler(false);
        // setOptionsToShow("");
      }
    };

    // Add a click event listener to the document body
    document.addEventListener("click", handleClickOutside);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleLanguage = (currentLanguage: string) => {
    setLanguage(currentLanguage);
    setCookie("googtrans", `/en/${currentLanguage}`, "Session");
    //important
    window.location.reload();
  };

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    // debugger
    // @ts-ignore
    window.googleTranslateElementInit = () => {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,fr" //here include all languages that you need
        },
        "google_translate_element"
      );
    };
  }, []);

  const setCookie = (cName: any, cValue: any, exDays: any) => {
    let d = new Date(),
      expires = exDays;
    if (typeof exDays === "number") {
      d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
      expires = "expires=" + d.toUTCString();
    }
    document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
  };

  return (
    <div ref={showLanguageTogglerRef} className="relative group">
      <button
        onClick={() => {
          window.innerWidth < 768 &&
            setShowLanguageToggler(!showLanguageToggler);
        }}
        className="flex items-center gap-0.5 group hover:text-custom-blue transition-all duration-300 bg-none">
        <MdLanguage className="text-3xl text-[#999999] group-hover:text-custom-blue" />
        <p className=" font-medium uppercase group-hover:text-custom-blue">
          <span translate="no">{language}</span>
        </p>
        <MdArrowDropUp
          className={`hidden md:group-hover:block group-hover:text-custom-blue ${
            showLanguageToggler && "!block"
          }`}
        />
        <MdArrowDropDown
          className={`block md:group-hover:hidden group-hover:text-custom-blue ${
            showLanguageToggler && "!hidden"
          }`}
        />
      </button>
      <div
        className={`absolute w-[200px] top-7 right-0 sm:-right-2 bg-white text-sm p-2 rounded-md shadow-custom-stuff ${
          showLanguageToggler ? "block" : "hidden md:group-hover:block"
        }`}>
        <p className="py-2 px-2 rounded-md">Change Language</p>
        <hr className="my-1.5" />
        <button
          onClick={() => {
            toggleLanguage("en");
          }}
          className="py-2 px-2 w-full rounded-md text-left flex gap-2 items-center active:bg-[#f2f2f2] active:text-black md:hover:text-black  md:hover:bg-[#f2f2f2] transition-all duration-300 hover:text-custom-blue">
          {/* <p> */}
            <span translate="no">English</span>
          {/* </p> */}
          {language === "en" && <MdCheck className="-mt-0.5" />}
        </button>
        <hr className="my-1.5" />
        <button
          onClick={() => {
            toggleLanguage("fr");
          }}
          className="py-2 px-2 w-full rounded-md text-left flex gap-2 items-center active:bg-[#f2f2f2] active:text-black md:hover:text-black  md:hover:bg-[#f2f2f2] transition-all duration-300 hover:text-custom-blue">
          {/* <p className=""> */}
            <span translate="no">French</span>
          {/* </p> */}
          {language === "fr" && <MdCheck className="-mt-0.5" />}
        </button>
      </div>
    </div>
  );
};

export default GoogleTranslate;
