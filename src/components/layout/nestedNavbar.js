import React, { useEffect } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Navbar from "./navbar";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    nestedNavList: {
        "& .rcm-MuiListItem-button:hover": {
            backgroundColor: theme.palette.grey[100]
        }
    },
    nestedNavList_collapse: {
        padding: `0px ${theme.spacing(2)}px 0px ${theme.spacing(2)}px`,
        "& .rcm-MuiListItem-button": {
            borderRadius: theme.borderRadius[3]
        }
    }
}));


const NestedNavbar = (props) => {

    const classes = useStyles();
    const { navItems, sidebarType, LayoutClick, openSidebar } = props;

    const [open, setOpen] = React.useState({});

    const handleOpen = (key) => {
        setOpen({
            ...open,
            [key]: !open[key] ?? true,
        });
    };

    useEffect(() => {
        setOpen({})
    }, [openSidebar])


    return (
        <List className={classes.nestedNavList}>
            {navItems.map((parentItem, index) => {
                return (
                    <>
                        <ListItem key={index} onClick={() => handleOpen(`panel${index}`)} button>
                            <ListItemIcon>
                                <Avatar
                                    variant="square"
                                    src={parentItem?.parentIcon}
                                    style={{ height: "auto", width: parentItem?.parentSize ?? 16 + "px" }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={parentItem?.parentName} />
                            {open[`panel${index}`] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse className={classes.nestedNavList_collapse} in={open[`panel${index}`]} timeout="auto" unmountOnExit>
                            <Navbar
                                openSidebar={openSidebar}
                                sidebarType={props?.sidebarType}
                                navItems={parentItem.navItems}
                                history={props?.history ?? null}
                                LayoutClick={LayoutClick} />
                        </Collapse>
                    </>
                )
            })}
        </List>
    )
}

NestedNavbar.defaultProps = {
    navItems: [
        {
            parentName: "Masters",
            parentSize: 16,
            parentIcon: "",
            navItems: [
                {
                    name: "Login",
                    pageId: "UyB59",
                    size: 16,
                    icon: "",
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

export default NestedNavbar;