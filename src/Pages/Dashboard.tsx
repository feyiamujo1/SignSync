import { Route, Routes } from "react-router-dom";
import DashboardHome from "./AdminPages/DashboardHome";
import DashboardViewTextVideos from "./AdminPages/DashboardViewTextVideos";
import DashboardReviewText from "./AdminPages/DashboardReviewText";
import Navbar from "../Components/Navbar";

const Dashboard = () => {
  return (
    <div className=" m-0 flex min-h-screen w-full bg-[#f9fafb] p-0">
      <Navbar />
      <div className="relative flex w-full">
        <main className="w-full bg-white pb-10 shadow-md ">
          {/* <div className="py-4"> */}
          <div className="w-[90%] mx-auto bg-white pt-24">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/review-new-text" element={<DashboardReviewText />} />
              <Route
                path="/view-video/:sentenceId/"
                element={<DashboardViewTextVideos />}
              />
            </Routes>
          </div>
          {/* </div> */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
