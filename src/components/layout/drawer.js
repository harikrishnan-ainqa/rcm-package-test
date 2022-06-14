import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    boxShadow: "none",
    "& .custom-material-ui-component-MuiAccordionSummary-root.Mui-expanded": {
      minHeight: "48px",
    },
    "& .custom-material-ui-component-MuiAccordionSummary-content.Mui-expanded":
      {
        margin: 0,
      },
    "& .custom-material-ui-component-MuiAccordionSummary-content.Mui-expanded":
      {
        margin: "12px 0",
      },
  },
  userContent: {
    marginRight: "3%",
  },
  HrTag: {
    marginRight: 18,
    marginLeft: 18,
    height: 28,
    backgroundColor: "white",
    width: 1,
  },
  TitleName: {
    fontWeight: 500,
    letterSpacing: 1.5,
  },
  Avatar: {
    marginRight: "2%",
  },
  Icons: {
    minWidth: 34,
    justifyContent: "center",
    paddingRight: 6,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    width: "100%",
  },
  list: {
    margin: "32px 0px",
  },
  langList: {
    padding: "6px",
    borderBottom: "1px solid #cccccc59",
    cursor: "pointer",
    width: "100px",
    display: "flex",
    fontSize: 14,
    fontWeight: 500,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // [theme.breakpoints.up("sm")]: {
    //   marginTop: 66,
    // },
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    // [theme.breakpoints.up("sm")]: {
    //   width: theme.spacing(9) + 1,
    //   marginTop: 66,
    // },
  },
}));

const NormalDrawer = (props) => {
  const classes = useStyles();
  const { LayoutClick } = props;
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List className={classes.list}>
          {props?.pages?.map((val, index) => (
            <ListItem
              button
              key={val + "" + index}
              className={props.active ? classes.active : classes.nonactive}
              onClick={() => LayoutClick(val, props)}
              style={{
                paddingLeft: "24px",
                paddingRight: "16px",
                margin: "6px 0px",
              }}
            >
              {/* <ListItemIcon className={classes.Icons}>
                <Avatar
                  variant="square"
                  src={val.icon}
                  style={{ height: "auto", width: val.size + "px" }}
                />
              </ListItemIcon> */}
              <Typography
                children={val.name}
                style={{ fontSize: val.size + "px" }}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

NormalDrawer.defaultProps = {
  pages: [
    {
      name: "Sign In",
      pageId: "UyB59",
      page: "/",
      masterLayoutId: "mQJ7V",
      size: 16,
      icon: "",
      childPageSelect: [],
    },
    {
      name: "Profile",
      pageId: "rj5VH",
      page: "/profile",
      masterLayoutId: "mQJ7V",
      size: 16,
      icon: "",
      childPageSelect: [],
    },
  ],
};

export default NormalDrawer;
