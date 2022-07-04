import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import withTheme from '../../themeProvider';
import withStyleFix from "../../stylefix";
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import Navbar from "./navbar";
import NestedNavbar from "./nestedNavbar";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TranslateIcon from '@material-ui/icons/Translate';


const useStyles = makeStyles((theme) => ({
  layout: {
    display: "grid",
  },
  layout_appbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10px 20px",
    alignItems: "center",
    "& h1": {
      fontWeight: 500
    }
  },
  layout_appbar_right: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    "& .version": {
      fontSize: "12px"
    }
  },
  layout_grid: {
    display: "grid",
    // marginTop: "63px"
  },
  layout_withSidebar: {
    gridTemplateColumns: "250px 1fr",
  },
  layout_withMiniSidebar: {
    gridTemplateColumns: "56px 1fr"
  },
  layout_aside: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: (props) => props.sidebarType === "miniVariant" ? "0px 10px 25px #0000000A" : theme.shadows[1],
    zIndex: 1,
    // display: "fixed",
    width: (props) => props.sidebarType === "miniVariant" && !props.openSidebar ? "56px" : "250px",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  layout_main: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    minHeight: "90vh",
    overflow: "auto"
  },
  layout_nav_wrapper: {
    padding: `${theme.spacing(2)}px 0px 0px 0px`,
    // position: "fixed",
    width: (props) => props.sidebarType === "miniVariant" && !props.openSidebar ? "56px" : "250px",
    overflowX: (props) => props.sidebarType === "miniVariant" && !props.openSidebar ? "hidden" : "visible",
    // left: 0,
    height: "max-content"
  },
  layout_sidebar_fixed: {
    top: "63px",
    backgroundColor: "white",
    flex: "1 0 auto",
    height: "100%",
    display: "flex",
    outline: 0,
    zIndex: 1200,
    position: "fixed",
    overflowY: "auto",
  },
  layout_translate: {
    display: "flex",
    gap: theme.spacing(1),
    alignItems: "center",
    "& .rcm-MuiSvgIcon-root": {
      width: theme.spacing(2),
    },
    "& .rcm-MuiSelect-root": {
      color: theme.palette.primary.contrastText,
      fontSize: theme.spacing(2)
    },
    "& .rcm-MuiInput-underline:before": {
      border: "none",
      content: "none"
    },
    "& .rcm-MuiSelect-icon": {
      color: theme.palette.primary.contrastText
    }
  }
}));


const Layout = (props) => {

  const [openSidebar, setOpenSidebar] = React.useState(false);

  const classes = useStyles({ ...props, openSidebar });
  const { sidebar, sidebarType, navItems, language, translate } = props;

  const [selectedLang, setSelectedLang] = React.useState(localStorage?.selectedLang ?? "en");
  const [languages, setLanguages] = React.useState([]);

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

  console.log(props, "props")

  const LayoutClick = (val) => {
    if (!props?.history) return;
    props.history.push(val?.page);
  };

  const handleChangeLang = (event) => {
    setSelectedLang(event.target.value);
    //set to localstorage
    //Reload the page
  };

  const navBarTypes = {
    list: Navbar,
    nestedList: NestedNavbar,
  };

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  }
  const handleSidebarClose = () => {
    setOpenSidebar(false);
  }

  function renderNavBar() {
    const NavBarType = navBarTypes[props?.navbarType];
    return (
      <NavBarType
        navItems={navItems}
        LayoutClick={LayoutClick}
        openSidebar={openSidebar}
        history={props?.history ?? null}
        sidebarType={props?.sidebarType}
      />
    )
  }

  React.useEffect(() => {
    //Set the languages based on the lanuage from the props
    let languageFromProps = language ?? [];
    let result = languageFromProps.reduce((acc, curr) => {
      let data = {
        label: curr,
        value: languageCodes[curr] ?? "",
      };
      return [...acc, data];
    }, []);
    setLanguages(result);
  }, [language]);

  return (
    <Box
      className={clsx(classes.layout, props?.className)}
      onClick={props?.onClick}
      onMouseDown={props?.onMouseDown}
      onMouseOver={props?.onMouseOver}
      onMouseOut={props?.onMouseOut}
      id={props?.id}
      data-id={props?.["data-id"]}
      data-name={props?.["data-name"]}
    >
      <AppBar elevation={1} position="static" className={classes.layout_appbar}>
        <Typography variant="h6" component={"h1"}>
          {props?.projectTitle}
        </Typography>
        <Box className={classes.layout_appbar_right}>
          <Typography variant="caption" className="version">
            {`V.${localStorage.version ?? 0.1}`}
          </Typography>
          <Box className={classes.layout_translate}>
            <TranslateIcon />
            <Select
              value={selectedLang}
              onChange={handleChangeLang}
              displayEmpty
              IconComponent={ExpandMoreIcon}
            >
              {languages.map((lang, index) => {
                return (
                  <MenuItem key={index} value={lang.value}>{lang?.label}</MenuItem>
                );
              })
              }
            </Select>
          </Box>
          <Divider style={{ height: '20px' }} orientation={"vertical"} />
          <Box style={{ display: "grid" }}>
            <Typography variant="body1" >
              {props?.title}
            </Typography>
            <Typography variant="caption" >
              {props?.subTitle}
            </Typography>
          </Box>
          <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Avatar
              alt="User"
              src={props?.userImage}
              variant={"rounded"}
            >
              {props?.Title?.split("")[0]}
            </Avatar>
            <ExpandMoreIcon style={{ color: "#fff" }} />
          </Box>
        </Box>
      </AppBar>
      <Box className={clsx(
        classes.layout_grid,
        sidebar && sidebarType === "static" && classes.layout_withSidebar,
        sidebar && sidebarType === "miniVariant" && classes.layout_withMiniSidebar
      )}>
        {sidebar &&
          <aside className={classes.layout_aside} onMouseEnter={handleSidebarOpen} onMouseLeave={handleSidebarClose}>
            <Box className={classes.layout_nav_wrapper}>
              {renderNavBar()}
            </Box>
          </aside>
        }
        <main className={classes.layout_main}>
          {props?.children}
        </main>
      </Box>
    </Box>
  );
};

Layout.defaultProps = {
  projectTitle: "RCM",
  title: "Martha Richards",
  subTitle: "Pharmacist, Apollo Hospital",
  userImage:
    "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?cs=srgb&dl=pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1382731.jpg&fm=jpg",
  sidebar: true,
  translate: true,
  navbarType: "nestedList", //nestedList
  sidebarType: "miniVariant",//miniVariant or static
  language: ["English", "Tamil", "Telugu"],
  navItems: [
    {
      parentName: "Masters",
      parentSize: 16,
      parentIcon: "",
      navItems: [
        {
          name: "Login",
          pageId: "UyB59",
          page: "/login",
          masterLayoutId: "mQJ7V",
          childPageSelect: [],
          size: 16,
          icon: "",
        },
        {
          name: "Dashboard",
          pageId: "rj5VH",
          page: "/dashboard",
          masterLayoutId: "mQJ7V",
          childPageSelect: [],
          size: 16,
          icon: "",
        },
      ],
    },
    {
      parentName: "Screens",
      parentSize: 16,
      parentIcon: "",
      pages: [
        {
          name: "Login",
          pageId: "UyB59",
          page: "/login",
          masterLayoutId: "mQJ7V",
          childPageSelect: [],
          size: 16,
          icon: "",
        },
        {
          name: "Dashboard",
          pageId: "rj5VH",
          page: "/dashboard",
          masterLayoutId: "mQJ7V",
          childPageSelect: [],
          size: 16,
          icon: "",
        },
      ],
    },
  ],
};

export default withStyleFix(withTheme(Layout));
