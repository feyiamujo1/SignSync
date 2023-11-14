import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Video from "./Pages/Video";

function App() {
  return (
    <div className="relative w-full p-0 m-0">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        containerId={"custom-toast-container"}
      />
      <Navbar />
      <div className="w-[90%] mx-auto relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contribute-video" element={<Video />} />

        </Routes>
        
      </div>
    </div>
  );
}

export default App;
