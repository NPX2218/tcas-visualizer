/////////////////////////////////////
// IMPORTING LIBRARIES
/////////////////////////////////////

import React, { Suspense } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Bibliographies from "../pages/Bibliographies/Bibliographies";
/////////////////////////////////////
// COMPONENT: ROUTER
/////////////////////////////////////

const Router: React.FC = (): JSX.Element => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            </div>
          }
        />
        <Route
          path="/bibliographies"
          element={
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <Bibliographies />
              </Suspense>
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
};

/////////////////////////////////////
// EXPORTING ROUTER
/////////////////////////////////////

export default Router;
