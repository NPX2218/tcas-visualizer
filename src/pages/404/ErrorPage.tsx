/////////////////////////////////////
// IMPORTING LIBRARIES
/////////////////////////////////////

import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { FaQuestionCircle } from "react-icons/fa";

/////////////////////////////////////
// COMPONENT: ERRORPAGE
/////////////////////////////////////

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-12 bg-black w-full">
      <div className="flex flex-col items-center self-stretch px-20 mt-1.5 w-full max-md:px-5 max-md:max-w-full overflow-hidden justify-center">
        <Navbar />
        <div className="text-white flex flex-row items-center justify-center sm:text-9xl text-8xl space-x-1 flex-1">
          <br />
          <br />
          <br />
          <span>4</span>
          <FaQuestionCircle className="text-white spinning" /> <span>4</span>
        </div>
        <button className="text-white text-lg p-4 bg-green-500 rounded-lg">
          <a href="/">Back Home</a>
        </button>
      </div>

      <Footer />
    </div>
  );
};

/////////////////////////////////////
// EXPORTING ERROR PAGE
/////////////////////////////////////

export default ErrorPage;
