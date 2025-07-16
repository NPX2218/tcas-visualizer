/////////////////////////////////////
// IMPORTING MODULES
/////////////////////////////////////

import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import LocomotiveScroll from "locomotive-scroll";
import LoadingScreen from "./LoadingScreen";
import TCASPlanetVisualizer from "./TCASPlanetVisualizer";
import TCASExplanationSection from "./TCASExplanationSection";

/////////////////////////////////////
// COMPONENT: HOME
/////////////////////////////////////

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [writingTransition, setWritingTransition] = useState<boolean>(false);
  const [delayedReveal, setDelayedReveal] = useState(false);

  useEffect(() => {
    if (writingTransition) {
      const timeout = setTimeout(() => {
        setDelayedReveal(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [writingTransition]);

  return (
    <div className="overflow-y-hidden">
      <LoadingScreen
        writingTransition={writingTransition}
        loading={loading}
        setLoading={setLoading}
      >
        <TCASPlanetVisualizer
          loading={loading}
          setWritingTransition={setWritingTransition}
        />
      </LoadingScreen>
      {delayedReveal && (
        <div>
          <TCASExplanationSection />
          <Footer />
        </div>
      )}
    </div>
  );
};

/////////////////////////////////////
// EXPORTING HOME
/////////////////////////////////////

export default Home;
