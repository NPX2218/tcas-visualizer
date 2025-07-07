import React from "react";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const alertMessage = (message: string) => {
  alertify.success(message);
};

export default alertMessage;
