import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../utils/utils";
import { MdDashboard } from "react-icons/md";
import { ImFileText } from "react-icons/im";
import { TbTextPlus } from "react-icons/tb";

const SideBar = ({
  showSideBar,
  setShowSideBar
}: {
  showSideBar: boolean;
  setShowSideBar: Function;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toggleNav = () => {
    if (typeof window !== "undefined") {
      const screen = window?.innerWidth;
      screen < 768 && setShowSideBar(!showSideBar);
    }
  };
  const logoutUser = () => {
    toggleNav();
    localStorage.setItem("auth", JSON.stringify({}));
    // Clear navigation history
    const state = { title: "Home", url: "/" };
    window.history.replaceState(state, state.title, state.url);
    navigate("/login", { replace: true });
  };
  return (
    <div
      className={cn(
        "fixed h-screen space-y-4 bg-white px-2 py-10 pt-[100px] shadow-lg transition-all md:w-[350px] md:px-6 md:overflow-y-scroll md:opacity-100",
        showSideBar && "w-80 overflow-y-scroll opacity-100 ",
        !showSideBar && "w-0 overflow-hidden opacity-0"
      )}>
      <ul id="" className="innerSidebar h-fit scroll-smooth pb-10 space-y-3">
        <li className="">
          <NavLink
            onClick={toggleNav}
            to="/admin/"
            className={`w-full flex gap-4 items-center py-3 hover:border-l-4 hover:font-light group pl-10 hover:text-custom-blue hover:border-l-custom-blue ${
              location.pathname === "/admin/" &&
              "text-custom-blue border-l-custom-blue bg-[#CFDEFD]"
            } cursor-pointer hover:bg-[#CFDEFD] rounded-md`}>
            <MdDashboard className="text-xl group-hover:fill-custom-blue" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={toggleNav}
            to="/admin/manage-all-text"
            className="w-full flex gap-4 items-center py-3 hover:border-l-4 hover:font-light group pl-10 hover:text-custom-blue hover:border-l-custom-blue active:text-custom-blue active:border-l-custom-blue cursor-pointer hover:bg-[#CFDEFD] rounded-md">
            <ImFileText className="text-xl group-hover:fill-custom-blue" />
            View Set Content
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={toggleNav}
            to="/admin/add-new-text"
            className="w-full flex gap-4 items-center py-3 hover:border-l-4 hover:font-light group pl-10 hover:text-custom-blue hover:border-l-custom-blue active:text-custom-blue active:border-l-custom-blue cursor-pointer hover:bg-[#CFDEFD] rounded-md">
            <TbTextPlus className="text-xl group-hover:fill-custom-blue" />
            Add New Text
          </NavLink>
        </li>
        <li>
          <p
            // onClick={toggleNav}
            onClick={logoutUser}
            className="w-full flex gap-4 items-center py-3 pl-10 hover:font-light group hover:bg-red-100 hover:text-red-500 cursor-pointer hover:border-l-red-500">
            <svg
              width="20"
              height="20"
              viewBox="0 0 36 30"
              className="group-hover:fill-red-500"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M4 29.4545C2.9 29.4545 1.958 29.1338 1.174 28.4924C0.390003 27.8509 -0.00132994 27.0807 3.39559e-06 26.1818V3.27273C3.39559e-06 2.37273 0.392003 1.602 1.176 0.960548C1.96 0.319093 2.90134 -0.00108813 4 2.77821e-06H18V3.27273H4V26.1818H18V29.4545H4ZM26 22.9091L23.25 20.5364L28.35 16.3636H12V13.0909H28.35L23.25 8.91818L26 6.54546L36 14.7273L26 22.9091Z" />
            </svg>
            Logout
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
