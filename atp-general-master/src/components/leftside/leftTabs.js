import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import {
    lighten,
    darken,
    fade,
} from '@material-ui/core/styles/colorManipulator'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import withTheme from '../../themeProvider'
import withStyleFix from '../../stylefix'
import { Paper, Button, Divider } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles((theme) => ({
    root: {
        paddingRight: theme.spacing(1),
    },
    rootTable: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        margingBottom: '15px',
        backgroundColor: '#fff',
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    avatar: {
        marginRight: theme.spacing(1),
    },
    flex: {
        display: 'flex',
    },
    actionsToolbar: {
        color: theme.palette.text.secondary,
        flex: '1 0 auto',
    },
    textField: {
        flexBasis: 200,
        width: 300,
        marginTop: 4,
    },
    table: {
        minWidth: 860,
        border: '1px solid #f4f4f5',
    },

    tableSmall: {
        minWidth: 500,
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    toolbar: {
        backgroundColor: '#f4f4f5',
        minHeight: 36,
        // border:`1px solid ${theme.palette.grey[900]}`,
        borderRadius: '5px',
        marginTop: '8px',
    },
    tableWrapper: {
        marginTop: '5px',
        padding: '20px',
    },
    title: {
        flex: '0 0 auto',
        '& h6': {
            fontSize: 20,
            fontWeight: 'bold',
            color:
                theme.palette.type === 'dark'
                    ? darken(theme.palette.primary.light, 0.2)
                    : darken(theme.palette.primary.dark, 0.2),
        },
    },
    Button: {
        margin: `${theme.spacing(1)}px 0`,
        padding: '5px 16px',
        float: 'right',
        backgroundColor: '#000',
        '&:hover': {
            backgroundColor: '#f15836 !important',
        },
    },

    iconSmall: {
        fontSize: 20,
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    tableChip: {
        margin: theme.spacing(1),
        color: theme.palette.common.white,
    },
    /*
        -----------------------
        ** Table Style **
        ** - Odd Even Stripped
        ** - Hover Style
        ** - Bordered Style
        ** - Empty Table
        ** - Table SIze
        -----------------------
        */
    stripped: {
        '& tbody tr:nth-child(even)': {
            background: '#f4f4f5',
        },
    },
    hover: {
        '& tbody tr:hover': {
            background: '#f4f4f5',
        },
        '&Button:hover': {
            backgroundColor: '#f15836 !important',
        }
    },
    bordered: {
        border: '1px solid #f4f4f5',
        '& thead tr': {
            background: '#f4f4f5',
        },
        '& td, th': {
            border: '#f4f4f5',
        },
        '& tr td, tr th': {
            '&:first-child': {
                borderLeft: 'none',
            },
            '&:last-child': {
                borderRight: 'none',
            },
        },
    },
    nodata: {
        textAlign: 'center',
        padding: '10px 10px 40px',
        fontSize: 24,
        lineHeight: '16px',
        color: theme.palette.grey[500],
        '& svg': {
            position: 'relative',
            top: -2,
            width: 26,
            height: 26,
            margin: '0 6px',
            fill: theme.palette.grey[500],
        },
    },
    small: {
        '& tr': {
            height: 24,
            '& td, th': {
                padding: '4px 10px',
                fontSize: 12,
            },
        },
    },
    medium: {
        '& tr': {
            height: 48,
            '&th': {
                padding: '4px 56px 4px 24px',
                fontSize: 15,
                color: "#403f3f"
            },

            '& td': {
                padding: '4px 56px 4px 24px',
                fontSize: 14,
                fontWeight: "550",
                color: "#403f3f"
            },
        },
    },
    big: {
        '& tr': {
            height: 64,
            '& td, th': {
                padding: '8px 56px 8px 24px',
                fontSize: 18,
            },
        },
    },
    settings: {
        //background: theme.palette.background.default,
        padding: 20,
        // borderRadius: theme.rounded.medium
    },
    up: {
        color: green[500],
        '& svg': {
            fill: green[500],
        },
    },
    down: {
        color: red[500],
        '& svg': {
            fill: red[500],
        },
    },
    flat: {
        color: theme.palette.divider,
        '& svg': {
            fill: theme.palette.divider,
        },
    },
    chartTable: {
        '& svg': {
            '& [class*="recharts-bar-rectangle"] path': {
                fill: fade(theme.palette.primary.main, 0.5),
            },
        },
    },

    Buttonleft: {
        float: "left",
        backgroundColor: theme.palette.primary.main,
    },

    spanStyle: {
        fontSize: "14px",
        textTransform: "none",
        fontWeight: "bold",
        color: "#fff",
        justifyContent: "flex-start",
    },

    appbarstyle: {
        height: "85vh",
        boxShadow: 'none !important'

    },
    Tabsstyle: {
        backgroundColor: "#fafafa",
        flexDirection: "inherit !important",
        justifyContent: "left !important"
    },

    leftsidebar: {
        backgroundColor: "#fafafa",
        border: "1px solid #f9f1f1",
        padding: "10px 10px",
        borderRadius: "12px",
        marginLeft: "10px"
    },
    SearchButton: {

        marginBottom: "20px"
    },
    inputstyle: {
        padding: "11px 19px",
        border: "1px solid #e5dddd",
        borderRadius: "5px"
    },
    iconLabelWrapper2: {
        display:"flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between"
      },
      tabIconStyle:{
   fontSize:"20px",
   float:"right"

      },
      labelContainer: {
        width: "auto",
        padding: 0
      },

}))
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const LeftTabs = (props) => {
    const classes = useStyles({ ...props })
    const { handleChange, handlegmFilterChange, handleOpen, gmfilter, value, gmdata , EditModelopen } = props;

    return (
        <>
            <div className={classes.leftsidebar}>
                <div className={classes.SearchButton}>
                    <input aria-invalid="false" placeholder="Search" type="text" value={gmfilter} onChange={handlegmFilterChange} className={classes.inputstyle} />
                </div>
                <Divider />

                <AppBar position="static" color="default" className={classes.appbarstyle} >
                    <Button className={classes.Addnewbutton} variant="contained" size="small" color="primary" onClick={handleOpen} startIcon={<AddIcon style={{ color: "#fff" }} />}>
                        <span className={classes.spanStyle}>Add New</span>
                    </Button>

                    <Tabs value={value}
                       
                        variant="scrollable"
                        scrollButtons="auto"
                        textColor="primary"
                        aria-label="icon position tabs example"
                        indicatorColor="default"
                        orientation="vertical"
                        className={classes.Tabsstyle}
                    >
                        {gmdata && gmdata.length ?
                            gmdata.filter(item => {
                                return Object.keys(item).some(key =>
                                    item[key].toString().toLowerCase().includes(gmfilter)
                                );
                            }).map((datas, index) => {
                                return (
                                    
                                     <Tab key={index} 
                                     onClick={(e) => handleChange(datas)}
                                     classes={{
                                        wrapper: classes.iconLabelWrapper2,
                                        labelContainer: classes.labelContainer
                                      }}  
                                      icon={<EditIcon className={classes.tabIconStyle}  onClick={(e) => EditModelopen(datas)}  />}
                                      label={datas.gentype} {...a11yProps(index)}>
                                   
                                    
                                    </Tab> 
                                  
                                )
                            })
                            : ""
                        }
                    </Tabs>
                </AppBar>
            </div>
        </>
    )

}






export default LeftTabs