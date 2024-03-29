import { Link, useNavigate } from "react-router-dom";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import GoogleTranslate from "./GoogleTranslate";
import { useAuthUser, useSignOut } from "react-auth-kit";


const Navbar = () => {
  const signOut = useSignOut();
  const auth = useAuthUser();
  const userInfo = auth();
  const userName = userInfo?.fName || "";

  const navigate = useNavigate();

  const [showDropDown, setShowDropDown] = useState(false);
  const contributionDropDownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contributionDropDownRef.current &&
        !contributionDropDownRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
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

  const userDropDownRef = useRef<HTMLDivElement | null>(null);
  const [showUserDropDown, setShowUserDropDown] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropDownRef.current &&
        !userDropDownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropDown(false);
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

  const logout = () => {
    signOut();
    localStorage.removeItem("expirationTime");
    navigate("/login");
  };

  return (
    <nav className="absolute w-full top-0 right-0 left-0  py-4 shadow-md bg-white z-50">
      <div className="w-[90%] mx-auto flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <Link to={"/"}>
            <div className="flex w-fit items-center gap-2 text-xl font-[Rowdies] font-medium">
              <div className="w-[35px] h-[35px]  p-1 cursor-pointer bg-[#1759da] rounded-xl text-center flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  // xmlnsSvgjs="http://svgjs.dev/svgjs"
                  width="128"
                  height="128"
                  viewBox="0 0 128 128">
                  <g transform="matrix(0.8046875,0,0,0.8046875,12.760752631578946,12.65303717566485)">
                    <svg
                      viewBox="0 0 95 95"
                      data-background-color="#dedede"
                      preserveAspectRatio="xMidYMid meet"
                      height="128"
                      width="128"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink">
                      <g
                        id="tight-bounds"
                        transform="matrix(1,0,0,1,-0.24049999999999727,-0.14115079308893996)">
                        <svg
                          viewBox="0 0 95.481 95.28230158617787"
                          height="95.28230158617787"
                          width="95.481">
                          <g>
                            <svg
                              viewBox="0 0 95.481 95.28230158617787"
                              height="95.28230158617787"
                              width="95.481">
                              <g>
                                <svg
                                  viewBox="0 0 95.481 95.28230158617787"
                                  height="95.28230158617787"
                                  width="95.481">
                                  <g id="textblocktransform">
                                    <svg
                                      viewBox="0 0 95.481 95.28230158617787"
                                      height="95.28230158617787"
                                      width="95.481"
                                      id="textblock">
                                      <g>
                                        <svg
                                          viewBox="0 0 95.481 95.28230158617787"
                                          height="95.28230158617787"
                                          width="95.481">
                                          <g>
                                            <svg
                                              viewBox="0 0 95.481 95.28230158617787"
                                              height="95.28230158617787"
                                              width="95.481">
                                              <g>
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                                  version="1.1"
                                                  x="0"
                                                  y="0"
                                                  viewBox="-16.222999636026806 -49.594 212.4571287427487 212.015"
                                                  enableBackground="new -25.167 -60.333 230 232.5"
                                                  xmlSpace="preserve"
                                                  height="95.28230158617787"
                                                  width="95.481"
                                                  className="icon-icon-0"
                                                  data-fill-palette-color="accent"
                                                  id="icon-0">
                                                  <path
                                                    d="M13.117 131.433l3.908 30.988h38.549c-2.463-26.235-4.538-53.131-8.715-77.688-0.87-8.455-8.303-37.146-18.046-38.199C8.04 43.045 28.55 77.669 23.984 84.947c-12.88-2.984-16.07-30.419-16.677-40.323-0.599-9.716 0.137-19.495 1.778-29.081 1.729-6.368 4.619-16.597-3.504-18.946 0.037 0.011 0.072 0.021 0.108 0.032C5.651-3.383 5.62-3.393 5.577-3.405-10.647-8.28-14.2 39.599-15.265 49.811c-2.309 22.142-1.199 46.957 11.86 65.897C-1.123 119.017 12.878 129.116 13.117 131.433z"
                                                    fill="#ffffff"
                                                    data-fill-palette-color="accent"></path>
                                                  <path
                                                    d="M162.986 162.421l3.908-30.988c0.238-2.316 14.24-12.416 16.521-15.725 13.061-18.94 14.17-43.756 11.861-65.897-1.064-10.212-4.619-58.091-20.842-53.216-0.043 0.013-0.076 0.022-0.113 0.034 0.035-0.011 0.072-0.021 0.109-0.032-8.125 2.35-5.234 12.578-3.506 18.946 1.643 9.586 2.377 19.365 1.779 29.081-0.607 9.904-3.799 37.339-16.68 40.323-4.564-7.278 15.945-41.902-4.828-38.414-9.742 1.054-17.177 29.744-18.047 38.199-4.177 24.558-6.252 51.453-8.716 77.688H162.986z"
                                                    fill="#ffffff"
                                                    data-fill-palette-color="accent"></path>
                                                  <path
                                                    d="M73.465 45.896V24.268H61.644c-9.73 0-17.646-8.576-17.646-19.115v-35.63c0-10.541 7.916-19.117 17.646-19.117h56.72c9.733 0 17.649 8.577 17.649 19.117V5.151c0 10.54-7.916 19.117-17.649 19.117h-23.27L73.465 45.896zM118.364-44.247h-56.72c-6.782 0-12.299 6.177-12.299 13.77V5.151c0 7.593 5.518 13.77 12.299 13.77h17.167v14.066L92.88 18.921h25.483c6.784 0 12.302-6.177 12.302-13.77v-35.628C130.666-38.07 125.148-44.247 118.364-44.247z"
                                                    fill="#ffffff"
                                                    data-fill-palette-color="accent"></path>
                                                  <g
                                                    fill="#374151"
                                                    data-fill-palette-color="accent">
                                                    <rect
                                                      x="66.733"
                                                      y="-26.747"
                                                      width="46.546"
                                                      height="5.347"
                                                      fill="#ffffff"
                                                      data-fill-palette-color="accent"></rect>
                                                  </g>
                                                  <g
                                                    fill="#374151"
                                                    data-fill-palette-color="accent">
                                                    <rect
                                                      x="66.733"
                                                      y="-16.052"
                                                      width="46.546"
                                                      height="5.347"
                                                      fill="#ffffff"
                                                      data-fill-palette-color="accent"></rect>
                                                  </g>
                                                  <g
                                                    fill="#374151"
                                                    data-fill-palette-color="accent">
                                                    <rect
                                                      x="66.733"
                                                      y="-5.358"
                                                      width="46.546"
                                                      height="5.347"
                                                      fill="#ffffff"
                                                      data-fill-palette-color="accent"></rect>
                                                  </g>
                                                </svg>
                                              </g>
                                            </svg>
                                          </g>
                                        </svg>
                                      </g>
                                    </svg>
                                  </g>
                                </svg>
                              </g>
                            </svg>
                          </g>
                          <defs></defs>
                        </svg>
                        <rect
                          width="95.481"
                          height="95.28230158617787"
                          fill="none"
                          stroke="none"
                          visibility="hidden"></rect>
                      </g>
                    </svg>
                  </g>
                </svg>
              </div>
              <p className="hidden sm:block text-custom-blue">SignSync</p>
            </div>
          </Link>
        </div>
        <div className={`flex gap-2 md:gap-5 items-center font-medium `}>
          <div ref={contributionDropDownRef} className="relative group">
            <button
              onClick={() => {
                window.innerWidth < 768 && setShowDropDown(!showDropDown);
              }}
              className={`flex items-center gap-1 sm:gap-1.5 cursor-pointer relative md:hover:text-custom-blue md:group-hover:text-custom-blue sm:text-lg transition-all duration-300 ${
                showDropDown && "text-custom-blue"
              }`}>
              <span>Contribute</span>
              <span>
                <MdArrowDropUp
                  className={`hidden md:group-hover:block ${
                    showDropDown && "!block"
                  }`}
                />
              </span>
              <span>
                <MdArrowDropDown
                  className={`block md:group-hover:hidden ${
                    showDropDown && "!hidden"
                  }`}
                />
              </span>
            </button>
            <div
              className={`absolute w-[200px] top-7 left-0 sm:-left-2 bg-white text-sm p-2 rounded-md shadow-custom-stuff ${
                showDropDown ? "block" : "hidden md:group-hover:block"
              }`}>
              <Link to={"/translate-text"}>
                <p className="py-2 px-2 rounded-md active:bg-[#f2f2f2] active:text-black md:hover:text-black  md:hover:bg-[#f2f2f2] transition-all duration-500">
                  Translate Text
                </p>
              </Link>
              <hr className="my-1.5" />
              <Link to={"/translate-video"}>
                <p className="py-2 px-2 rounded-md active:bg-[#f2f2f2] active:text-black md:hover:text-black  md:hover:bg-[#f2f2f2] transition-all duration-500">
                  Translate Video
                </p>
              </Link>
              <hr className="my-1.5" />
              <Link to={"/contribute-text"}>
                <p className="py-2 px-2 rounded-md active:bg-[#f2f2f2] active:text-black md:hover:text-black  md:hover:bg-[#f2f2f2] transition-all duration-500">
                  Contribute Text
                </p>
              </Link>
            </div>
          </div>
          {userName !== "" ? (
            <div ref={userDropDownRef} className="relative group">
              <button
                onClick={() => {
                  window.innerWidth < 768 &&
                    setShowUserDropDown(!showUserDropDown);
                }}
                className={`flex items-center gap-1 sm:gap-1.5 cursor-pointer relative md:hover:text-custom-blue md:group-hover:text-custom-blue  transition-all duration-300 ${
                  showUserDropDown && "text-custom-blue"
                }`}>
                <FaUserCircle className="text-3xl text-[#999999] group-hover:text-custom-blue transition-all duration-200" />
                <span className="flex items-center gap-1 sm:gap-1.5 ">
                  <span className="font-medium sm:text-lg">
                    <span translate="no">{userName}</span>
                  </span>
                  <MdArrowDropUp
                    className={`hidden md:group-hover:block ${
                      showUserDropDown && "!block"
                    }`}
                  />
                  <MdArrowDropDown
                    className={`block md:group-hover:hidden ${
                      showUserDropDown && "!hidden"
                    }`}
                  />
                </span>
              </button>
              <div
                className={`absolute w-[200px] top-7 right-1 sm:right-0 sm:-left-6 bg-white text-sm p-2 rounded-md shadow-custom-stuff ${
                  showUserDropDown ? "block" : "hidden md:group-hover:block"
                }`}>
                {userInfo?.role === "admin" && (
                  <>
                    <Link to={"/admin/"}>
                      <p className="py-2 px-2 rounded-md active:bg-[#f2f2f2] active:text-black md:hover:text-black  md:hover:bg-[#f2f2f2] transition-all duration-500">
                        View All Text
                      </p>
                    </Link>
                    <hr className="my-1.5" />
                    <Link to={"/admin/review-new-text"}>
                      <p className="py-2 px-2 rounded-md active:bg-[#f2f2f2] active:text-black md:hover:text-black  md:hover:bg-[#f2f2f2] transition-all duration-500">
                        Verify New Text
                      </p>
                    </Link>
                    <hr className="my-1.5" />
                    <Link to={"/admin/review-custom-video"}>
                      <p className="py-2 px-2 rounded-md active:bg-[#f2f2f2] active:text-black md:hover:text-black  md:hover:bg-[#f2f2f2] transition-all duration-500">
                        View Custom Uploads
                      </p>
                    </Link>
                  </>
                )}
                <hr className="my-1.5" />
                <button
                  onClick={logout}
                  className="w-full text-left cursor-pointer py-2 px-2 rounded-md active:bg-[#f2f2f2] active:text-black md:hover:text-black  md:hover:bg-[#f2f2f2] transition-all duration-500">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className=" font-medium sm:text-lg text-black w-fit flex gap-2 items-center group active:custom-blue  md:hover:text-custom-blue transition-all duration-300">
                Login
              </Link>
              <Link
                to="/register"
                className="px-2 md:px-4 py-1 font-medium sm:text-lg bg-[#fe4646] w-fit rounded-md text-white flex gap-2 items-center group active:bg-[#f2f2f2] active:text-black md:hover:text-black  md:hover:bg-[#f2f2f2] transition-all duration-500">
                Register
              </Link>
            </>
          )}
          <GoogleTranslate />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
