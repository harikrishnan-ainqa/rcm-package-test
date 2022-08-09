import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    overflowX: "hidden",
    backgroundColor: theme?.palette?.background?.table,

    "& .App1-MuiTab-textColorPrimary": {
      "&.Mui-selected": {
        color: "#007AFF",
      },
    },
    "&.App1-MuiPaper-elevation4": {
      shadow: "none",
    },
    "& .App1-MuiTab-root": {
      [theme.breakpoints.up("xs")]: {
        minWidth: "inherit !important",
      },
    },
    "& .App1-MuiAppBar-root": {
      width: "80%",
    },

  },
  MuiTab: {
    root: {
      minWidth: 0,
      "@media (min-width: 0px)": {
        minWidth: 0,
      },
    },
  },
  box: {
    padding: "24px 12px",
    paddingBottom: "43px",
    backgroundColor: theme?.palette?.background?.common,
    // height: "100vh",
    height: "100%",
    paddingTop: "14px",
  },

  MainHead: {

    backgroundColor: theme?.palette?.background?.common,
  },
  AppHeading: {
    paddingTop: "14px",
    paddingLeft: "25px",
    fontFamily: "poppinsemibold",
    fontSize: "14px",
    whiteSpace: "nowrap",
    fontWeight: "bold"
  },
  AppBarstyle: {
    backgroundColor: "#fff",
    boxShadow: "none",
    zIndex: "auto"

  },
  TabStyle: {

    fontSize: "13px",
    textTransform: "unset",
    fontFamily: "poppinsemibold",
    paddingLeft: "0px",
    paddingRight: "0px",
    marginLeft: "20px",
    fontWeight: "bold"
  }

}))

export default useStyles;