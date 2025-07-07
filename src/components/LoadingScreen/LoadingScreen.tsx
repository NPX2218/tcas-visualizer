/////////////////////////////////////
// IMPORTING MODULES
/////////////////////////////////////

import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

/////////////////////////////////////
// INTERFACE PROPS
/////////////////////////////////////
interface Props {
  condition: boolean;
}

/////////////////////////////////////
// COMPONENT: LOADINGSCREEN
/////////////////////////////////////

const LoadingScreen = ({ condition }: Props) => {
  return (
    <Backdrop
      sx={{
        backgroundColor: "black",
        color: "#22c55e",
        overflow: "hidden",
        height: "100%",
        margin: "0px 0px 0px 0px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={condition}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

/////////////////////////////////////
// EXPORTING LOADINGSCREEN
/////////////////////////////////////

export default LoadingScreen;
