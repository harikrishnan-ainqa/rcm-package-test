import React from "react";
import { AlertSnack } from "./components/Alert";

export const AlertContext = React.createContext({
  open: false,
  severity: "",
  message: "",
  yAxis: "top",
  xAxis: "center",
  setAlert: () => false,
  onClose: () => false,
});

export const AlertProvider = (props) => {

  const [state, setState] = React.useState({
    open: false,
    severity: "",
    message: "",
    yAxis: "top",
    xAxis: "center",
  });

  const setSnack = (props) => {
    setState(props);
  };

  const onCloseSnack = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <AlertContext.Provider
      value={{ ...state, setAlert: setSnack, onClose: onCloseSnack }}
    >
      {state.open && (
        <AlertSnack
          open={state.open}
          severity={state.severity}
          message={state.message}
          yAxis={state.yAxis}
          xAxis={state.xAxis}
          handleClose={onCloseSnack}
        />
      )}

      {props.children}
    </AlertContext.Provider>
  );
};
