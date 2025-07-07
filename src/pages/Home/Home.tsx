/////////////////////////////////////
// IMPORTING MODULES
/////////////////////////////////////

import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import LocomotiveScroll from "locomotive-scroll";
import LoadingScreen from "./LoadingScreen";
import TCASVisualizer from "./TCASVisualizer";
var Latex = require("react-latex");

/////////////////////////////////////
// INTERFACE: PROPS
/////////////////////////////////////

interface Props {
  scroll?: LocomotiveScroll | null;
}

/////////////////////////////////////
// COMPONENT: HOME
/////////////////////////////////////

const Home = ({ scroll }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div>
      <LoadingScreen loading={loading} setLoading={setLoading}>
        <TCASVisualizer loading={loading} />
      </LoadingScreen>
    </div>
  );
};

/////////////////////////////////////
// EXPORTING HOME
/////////////////////////////////////

export default Home;
