import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Toolbar from "@material-ui/core/Toolbar";

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

const NestedDrawer = (props) => {
  const classes = useStyles();
  const [openAcc, setopenAcc] = React.useState(false);
  const { LayoutClick } = props;

  const handleAcc = (key) => {
    setopenAcc({
      ...openAcc,
      [key]: !openAcc[key] ?? true,
    });
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <List>
        {props?.nestedNavItems &&
          props?.nestedNavItems.length > 0 &&
          props?.nestedNavItems.map((group, index) => {
            return (
              <>
                <ListItem
                  button
                  key={index}
                  expanded={openAcc[`panel${index}`]}
                  onClick={() => handleAcc(`panel${index}`)}
                  className={classes.drawerContainer}
                  style={{ paddingLeft: "24px", paddingRight: "16px" }}
                >
                  {/* <ListItemIcon
                    style={{
                      paddingLeft: "0px",
                    }}
                  >
                    <Avatar
                      variant="square"
                      src={group?.parentIcon}
                      style={{
                        height: "auto",
                        width: group.parentIconSize + "px",
                      }}
                    />
                  </ListItemIcon> */}
                  <ListItemText
                    style={{ color: "#2A60BC" }}
                    primary={group.parentName}
                  />
                  {openAcc[`panel${index}`] ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </ListItem>
                <Collapse
                  in={openAcc[`panel${index}`]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div">
                    {group?.pages &&
                      group?.pages.length > 0 &&
                      group?.pages.map((val, index) => (
                        <ListItem
                          style={{
                            paddingLeft: "50px",
                          }}
                          button
                          key={val + "" + index}
                          className={
                            props.active ? classes.active : classes.nonactive
                          }
                          onClick={() => LayoutClick(val, props)}
                        >
                          {/* {props.icon && (
                            <ListItemIcon className={classes.Icons}>
                              <Avatar
                                variant="square"
                                src={val.icon}
                                style={{
                                  height: "auto",
                                  width: val.size + "px",
                                }}
                              />
                            </ListItemIcon>
                          )} */}
                          <ListItemText
                            primary={val.name}
                            style={{ fontSize: val?.size ?? 16 + "px" }}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
              </>
            );
          })}
      </List>
    </Drawer>
  );
};

NestedDrawer.defaultProps = {
  nestedNavItems: [
    {
      parentName: "Masters",
      pages: [
        {
          name: "Login",
          pageId: "UyB59",
          page: "/login",
          masterLayoutId: "mQJ7V",
          childPageSelect: [],
        },
        {
          name: "Dashboard",
          pageId: "rj5VH",
          page: "/dashboard",
          masterLayoutId: "mQJ7V",
          childPageSelect: [],
        },
      ],
    },
    {
      parentName: "Screens",
      pages: [
        {
          name: "Login",
          pageId: "UyB59",
          page: "/login",
          masterLayoutId: "mQJ7V",
          childPageSelect: [],
        },
        {
          name: "Dashboard",
          pageId: "rj5VH",
          page: "/dashboard",
          masterLayoutId: "mQJ7V",
          childPageSelect: [],
        },
      ],
    },
  ],
};

export default NestedDrawer;

{
  /* <Drawer
  onMouseOver={() => handleDrawerHover()}
  onMouseLeave={() => handleDrawerLeave()}
  variant="permanent"
  className={clsx(classes.drawer, {
    [classes.drawerOpen]: openDrawer,
    [classes.drawerClose]: !openDrawer,
  })}
  classes={{
    paper: clsx({
      [classes.drawerOpen]: openDrawer,
      [classes.drawerClose]: !openDrawer,
    }),
  }}
>
  <Accordion expanded={openAcc} className={classes.drawerContainer}>
    <List onClick={() => handleAcc()}>
      {[props.parentText ? props.parentText : "Masters"].map((text, index) => (
        <ListItem button key={text + index}>
          <ListItemIcon
            style={{
              paddingLeft: "0px",
            }}
          >
            {props.parentIcon ? (
              props.parentIcon
            ) : (
              <CalendarTodayIcon style={{ color: "#2A60BC" }} />
            )}
          </ListItemIcon>
          <ListItemText style={{ color: "#2A60BC" }} primary={text} />
          <ListItemIcon>
            {openAcc ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
    <List>
      {props?.pages?.map((val, index) => (
        <ListItem
          style={{
            paddingLeft: "50px",
          }}
          button
          key={val + "" + index}
          className={props.active ? classes.active : classes.nonactive}
          onClick={() => LayoutClick(val, props)}
        >
          {props.icon && (
            <ListItemIcon className={classes.Icons}>
              <Avatar
                variant="square"
                src={val.icon}
                style={{ height: "auto", width: val.size + "px" }}
              />
            </ListItemIcon>
          )}
          <Typography
            children={val.name}
            style={{ fontSize: val?.size ?? 16 + "px" }}
          />
        </ListItem>
      ))}
    </List>
  </Accordion>
</Drawer>; */
}
