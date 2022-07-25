import React from "react";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

const withStyleFix = (Component) => (props) => {
  const generateClassName = createGenerateClassName({
    productionPrefix: "report-viewer",
    seed: "report-viewer",
  });

  return (
    <StylesProvider generateClassName={generateClassName} injectFirst>
      <Component {...props}>{props.children}</Component>
    </StylesProvider>
  );
};

export default withStyleFix;
