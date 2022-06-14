import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Popover, Accordion } from "@material-ui/core";
import clsx from "clsx";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import NormalDrawer from "./drawer";
import NestedDrawer from "./nestedDrawer";

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

//WSF - Without Style Fix

const Layout = (props) => {
  const classes = useStyles();
  const [selectedLang, setSelectedLang] = React.useState(null);
  const [languages, setLanguages] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const LayoutClick = (val, props) => {
    props?.history?.push(val?.page);
  };

  const languageCodes = {
    Amharic: "am",
    Arabic: "ar",
    Bangla: "bn",
    Belarusian: "be",
    Bulgarian: "bg",
    ChineseHongKong: "yue-hant",
    ChineseSimplified: "zh",
    ChineseTraditional: "zh-hant",
    English: "en",
    French: "fr",
    German: "de",
    Greek: "el",
    Gujarati: "gu",
    Hebrew: "he",
    Hindi: "hi",
    Italian: "it",
    Japanese: "ja",
    Kannada: "kn",
    Malayalam: "ml",
    Marathi: "mr",
    Nepali: "ne",
    Odia: "or",
    Persian: "fa",
    PortugueseBrazil: "pt",
    Punjabi: "pa",
    Russian: "ru",
    Sanskrit: "sa",
    Serbian: "sr",
    Sinhala: "si",
    Spanish: "es",
    Tamil: "ta",
    Telugu: "te",
    Tigrinya: "ti",
    Ukrainian: "uk",
    Urdu: "ur",
    Vietnamese: "vi",
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeLang = (v) => {
    handleClose();
    setSelectedLang(v?.key ?? null);
    props.onChange(v);
  };

  React.useEffect(() => {
    //Set the languages based on the lanuage from the props
    let languageFromProps = props?.Language ?? [];

    let result = languageFromProps.reduce((acc, curr) => {
      let data = {
        label: curr,
        key: languageCodes[curr] ?? "",
      };
      return [...acc, data];
    }, []);
    setLanguages(result);
    // setLang(key);
  }, [props?.Language]);

  React.useEffect(() => {
    setSelectedLang(props?.defaultLanuage ?? "en");
  }, [props?.defaultLanuage]);

  const [openDrawer, setopenDrawer] = React.useState(false);
  const [openAcc, setopenAcc] = React.useState(false);

  const navBarTypes = {
    Normal: NormalDrawer, //Without Nested nav & hover to open
    Nested: NestedDrawer, //With nested nav
    // NestedHover: HoverDrawer, //With nested & hover to open
  };

  function renderDrawer() {
    const type = props.navBarType ?? "Normal";
    const Drawer = navBarTypes[type];
    return (
      <Drawer
        pages={props?.pages}
        nestedNavItems={props?.nestedNavItems}
        LayoutClick={LayoutClick}
      />
    );
  }

  const handleDrawerHover = () => {
    setopenDrawer(true);
  };

  const handleDrawerLeave = () => {
    setopenAcc(false);
    setopenDrawer(false);
  };

  const handleAcc = () => {
    setopenAcc(!openAcc);
  };

  return (
    <div className="custom_material_ui_header">
      <div className={classes.root} {...props}>
        {props.Header ? (
          <AppBar
            position="fixed"
            className={classes.appBar}
            style={{
              backgroundColor: props.HeaderBackgroundColor,
              color: props.HeaderFontColor,
            }}
            elevation={0}
          >
            <Toolbar>
              <Grid container>
                <Grid
                  container
                  item
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  xs={6}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  {props?.ProjectTitle ?? (
                    <Typography
                      variant="subtitle1"
                      noWrap
                      className={classes.TitleName}
                    >
                      {props?.ProjectTitle ? props?.ProjectTitle : "Title"}
                    </Typography>
                  )}
                </Grid>
                <Grid
                  container
                  item
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  xs={6}
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Grid
                    container
                    item
                    sm={8}
                    md={8}
                    lg={8}
                    xl={8}
                    xs={8}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    className={classes.userContent}
                  >
                    {props?.Transtale ? (
                      <Grid
                        container
                        item
                        sm={2}
                        md={2}
                        lg={2}
                        xl={2}
                        xs={2}
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                      >
                        <div style={{ display: "flex", textAlign: "center" }}>
                          <svg
                            style={{ fill: "white" }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="18px"
                            height="18px"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                              d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                              class="css-c4d79v"
                            ></path>
                          </svg>
                          {selectedLang && (
                            <Typography
                              style={{
                                paddingLeft: "2px",
                                textTransform: "uppercase",
                                fontSize: "12px",
                              }}
                              onClick={(event) => handleClick(event)}
                            >
                              {selectedLang}
                            </Typography>
                          )}
                          <ExpandMoreIcon
                            onClick={(event) => handleClick(event)}
                            style={{ width: "20px", height: "20px" }}
                          />
                        </div>
                        <Popover
                          id={"lang-popover"}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          style={{
                            boxShadow: "0px 10px 25px #0000000a",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          {languages.length > 0 &&
                            languages.map((lang) => {
                              return (
                                <Typography
                                  onClick={(e) => changeLang(lang)}
                                  className={classes.langList}
                                >
                                  {lang?.label}
                                </Typography>
                              );
                            })}
                        </Popover>
                      </Grid>
                    ) : (
                      <span />
                    )}

                    <Grid
                      container
                      item
                      sm={4}
                      md={4}
                      lg={4}
                      xl={4}
                      xs={4}
                      direction="column"
                      justifyContent="flex-end"
                      alignItems="flex-end"
                    >
                      {props?.VersionNo ? (
                        <Typography variant="caption" noWrap>
                          {props?.VersionNo
                            ? props?.VersionNo
                            : "Version: 0.1.73"}
                        </Typography>
                      ) : (
                        <span />
                      )}
                    </Grid>
                    {props?.VersionNo && (props?.Title || props?.SubTitle) ? (
                      <div className={classes.HrTag}></div>
                    ) : (
                      <span />
                    )}
                    <Grid
                      container
                      item
                      sm={4}
                      md={4}
                      lg={4}
                      xl={4}
                      xs={4}
                      direction="column"
                      justifyContent="flex-end"
                      alignItems="flex-end"
                    >
                      <Grid
                        container
                        item
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        xs={12}
                      >
                        {props?.Title ? (
                          <Typography variant="subtitle1" noWrap>
                            {props?.Title ? props?.Title : "Martha Richards"}
                          </Typography>
                        ) : (
                          <span />
                        )}
                      </Grid>
                      <Grid
                        container
                        item
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        xs={12}
                      >
                        {props.SubTitle ? (
                          <Typography variant="caption" noWrap>
                            {props?.SubTitle
                              ? props?.SubTitle
                              : "Pharmacist, Apollo Hospital"}
                          </Typography>
                        ) : (
                          <span />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {props?.ImageSrc || props?.Title ? (
                    <Avatar
                      alt="Remy Sharp"
                      src={props?.ImageSrc}
                      className={classes.Avatar}
                      variant={"rounded"}
                    >
                      {props?.Title?.split("")[0]}
                    </Avatar>
                  ) : (
                    <span />
                  )}
                  <ExpandMoreIcon style={{ color: "#fff" }} />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        ) : (
          <span />
        )}
        <div
          className="custom_material_ui_drawer_body"
          style={{ width: `calc(100% - ${drawerWidth}px)` }}
        >
          {props.Menu ? renderDrawer(props) : <span />}
          <main className={classes.content}>
            <Toolbar />
            {props?.Component}
          </main>
        </div>
      </div>
    </div>
  );
};

Layout.defaultProps = {
  Header: true,
  navBarType: "Normal",
  ProjectTitle: "RCM",
  VersionNo: "Version: 0.1.73",
  Title: "Martha Richards",
  SubTitle: "Pharmacist, Apollo Hospital",
  ImageSrc:
    "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?cs=srgb&dl=pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1382731.jpg&fm=jpg",
  Menu: true,
};

export default Layout;
