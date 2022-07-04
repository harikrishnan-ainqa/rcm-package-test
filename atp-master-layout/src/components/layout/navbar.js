import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    navlist: {
        "& .rcm-MuiListItem-button:hover": {
            backgroundColor: theme.palette.grey[100]
        },
        "& .rcm-MuiListItem-root": {
        }
    },
    navitem_active: {
        backgroundColor: theme.palette.primary.light
    }
}));


const Navbar = (props) => {
    const classes = useStyles(props);
    const { navItems, LayoutClick, sidebarType, openSidebar } = props;
    return (
        <List className={classes.navlist}>
            {navItems.length > 0 && navItems.map((item) => {
                console.log(props?.history?.location?.pathname, item.page)
                return (
                    <ListItem key={item?.pageId} button onClick={() => LayoutClick(item)} className={clsx(props?.history?.location?.pathname === item.page && classes.navitem_active)}>
                        <ListItemIcon>
                            {
                                item?.icon?.length > 2 ? (
                                    <Avatar
                                        variant="square"
                                        src={item?.icon}
                                        style={{ height: "auto", width: item?.size ?? 16 + "px" }}
                                    />
                                )
                                    : (
                                        <LinkIcon />
                                    )
                            }
                        </ListItemIcon>
                        {(sidebarType === "miniVariant" && openSidebar) && <ListItemText primary={item?.name} />}
                        {sidebarType !== "miniVariant" && <ListItemText primary={item?.name} />}
                    </ListItem>
                )
            })}
        </List>
    )
}

Navbar.defaultProps = {
    navItems: [
        {
            name: "Hello World",
            pageId: "UyB59",
            page: "/",
            masterLayoutId: "mQJ7V",
            size: 16,
            icon: "",
            childPageSelect: [],
        },
        {
            name: "Sign In",
            pageId: "Uyc59",
            page: "/sign-in",
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

export default Navbar;