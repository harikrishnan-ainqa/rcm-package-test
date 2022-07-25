import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Quicksand, sans-serif !important",
    width: "100%",
    "& > * + *": {
      marginTop: "20px",
    },
  },
}));

export const AlertSnack = (props) => {
  const {
    open,
    handleClose = () => false,
    message,
    severity,
    yAxis,
    xAxis,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: yAxis,
          horizontal: xAxis,
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <div>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </div>
      </Snackbar>
    </div>
  );
};
