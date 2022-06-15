import React from "react";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";

const withStyleFix = (Component) => (props) => {
  const generateClassName = createGenerateClassName({
    productionPrefix: "fcb", //Change it based on the package
    seed: "fcb", //Change it based on the package
  });

  return (
    <StylesProvider generateClassName={generateClassName} injectFirst>
      <Component {...props}>{props.children}</Component>
    </StylesProvider>
  );
};

export default withStyleFix;
