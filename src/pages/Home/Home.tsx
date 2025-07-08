/////////////////////////////////////
// IMPORTING MODULES
/////////////////////////////////////

import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import LocomotiveScroll from "locomotive-scroll";
import LoadingScreen from "./LoadingScreen";
import TCASVisualizer from "./TCASVisualizer";
import TCASWriting from "./TCASWriting";
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
  const [writingTransition, setWritingTransition] = useState<boolean>(false);
  const [delayedReveal, setDelayedReveal] = useState(false);

  useEffect(() => {
    if (writingTransition) {
      const timeout = setTimeout(() => {
        setDelayedReveal(true);
      }, 3000); // 3 seconds
      return () => clearTimeout(timeout); // cleanup
    }
  }, [writingTransition]);

  return (
    <div className="overflow-y-hidden">
      <LoadingScreen
        writingTransition={writingTransition}
        loading={loading}
        setLoading={setLoading}
      >
        <TCASVisualizer
          loading={loading}
          writingTransition={writingTransition}
          setWritingTransition={setWritingTransition}
        />
      </LoadingScreen>
      {delayedReveal && (
        <div>
          <TCASWriting />
        </div>
      )}
    </div>
  );
};

/////////////////////////////////////
// EXPORTING HOME
/////////////////////////////////////

export default Home;
