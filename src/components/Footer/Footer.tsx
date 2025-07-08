/////////////////////////////////////
// IMPORTING LIBRARIES
/////////////////////////////////////

import React from "react";
import { Link } from "react-router-dom";

/////////////////////////////////////
// COMPONENT: FOOTER
/////////////////////////////////////

const Footer = () => {
  return (
    <div className="w-full h-full">
      <div className="self-stretch mt-32 w-full bg-gray-600 min-h-[1px] max-md:mt-10 max-md:max-w-full" />
      <div className="self-start mt-11 ml-16 leading-9 text-black max-md:mt-10 max-md:max-w-full flex flex-row space-x-1">
        <p>Made by</p> <span className="text-gray-600">Neel Bansal</span>{" "}
        <Link to="/bibliographies">— Copyright {new Date().getFullYear()}</Link>
      </div>
    </div>
  );
};

/////////////////////////////////////
// EXPORTING FOOTER
/////////////////////////////////////

export default Footer;
