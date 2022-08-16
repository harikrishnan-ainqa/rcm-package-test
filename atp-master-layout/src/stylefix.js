import React from "react";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const withStyleFix = (Component) => (props) => {
  const generateClassName = createGenerateClassName({
    productionPrefix: "rcm",
    seed: "rcm",
  });

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Component {...props}>{props.children}</Component>
    </StylesProvider>
  );
};

export default withStyleFix;
