/////////////////////////////////////
// IMPORTING LIBRARIE
/////////////////////////////////////

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../auth/AuthContext.tsx";

import Home from "../pages/Home/Home.tsx";
import Authentication from "../pages/Authentication/Authentication.tsx";
import About from "../pages/About/About.tsx";
import AssignmentOne from "../pages/Assingments/AssingmentPages/AssignmentOne.tsx";
import AssignmentsHub from "../pages/AssignmentsHub/AssignmentsHub.tsx";
import Bibliographies from "../pages/Bibliographies/Bibliographies.tsx";
import ErrorPage from "../pages/404/ErrorPage.tsx";

/////////////////////////////////////
// COMPONENT: ROUTER
/////////////////////////////////////

const Router: React.FC = (): JSX.Element => {
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    import("locomotive-scroll").then((locomotiveModule) => {
      const ScrollEl = document.querySelector(
        "[data-scroll-container]"
      ) as HTMLElement;
      const newScroll = new locomotiveModule.default({
        el: ScrollEl,
        smooth: true,
        multiplier: 1.2,
        class: "is-reveal",
      });

      setScroll(newScroll);

      new ResizeObserver(() => newScroll.update()).observe(
        document.querySelector("[data-scroll-container]") as HTMLElement
      );

      return () => newScroll.destroy();
    });
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div data-scroll-container>
                <Home scroll={scroll} />
              </div>
            }
          />
          <Route
            path="/authentication"
            element={
              <div data-scroll-container>
                <Authentication scroll={scroll} />
              </div>
            }
          />
          <Route
            path="/assignments-hub"
            element={
              <div data-scroll-container>
                <AssignmentsHub scroll={scroll} />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div data-scroll-container>
                <About scroll={scroll} />
              </div>
            }
          />
          <Route
            path="/assignment-1"
            element={
              <div data-scroll-container>
                <AssignmentOne scroll={scroll} />
              </div>
            }
          />
          <Route
            path="/bibliographies"
            element={
              <div data-scroll-container>
                <Bibliographies scroll={scroll} />
              </div>
            }
          />

          <Route
            path="*"
            element={
              <div data-scroll-container>
                <ErrorPage />
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

/////////////////////////////////////
// EXPORTING ROUTER
/////////////////////////////////////

export default Router;
