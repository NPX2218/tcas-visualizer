import React from "react";
var Latex = require("react-latex");

interface Props {
  text: string;
}

const CenteredLatex = ({ text }: Props) => {
  return (
    <span className="flex-col space-y-8 w-full flex items-center justify-center p-8">
      <Latex>{`$\\displaystyle ${text}$`}</Latex>
    </span>
  );
};

export default CenteredLatex;
