/////////////////////////////////////
// IMPORTING LIBRARIES
/////////////////////////////////////

import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Bibliographies from "../pages/Bibliographies/Bibliographies";
/////////////////////////////////////
// COMPONENT: ROUTER
/////////////////////////////////////

const Router: React.FC = (): JSX.Element => {
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      /* import("locomotive-scroll").then((locomotiveModule) => {
        const ScrollEl = scrollRef.current as any;
        const newScroll = new locomotiveModule.default({
          el: ScrollEl,
          smooth: true,
          multiplier: 1.2,
          class: "is-reveal",
        });

        setScroll(newScroll);

        new ResizeObserver(() => newScroll.update()).observe(ScrollEl);

        return () => newScroll.destroy();
      });*/
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div ref={scrollRef}>
              <Suspense fallback={<div>Loading...</div>}>
                <Home scroll={scroll} />
              </Suspense>
            </div>
          }
        />
        <Route
          path="/bibliographies"
          element={
            <div ref={scrollRef}>
              <Suspense fallback={<div>Loading...</div>}>
                <Bibliographies scroll={scroll} />
              </Suspense>
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default Router;
