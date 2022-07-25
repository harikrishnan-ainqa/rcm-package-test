import React, { useEffect, useState } from 'react'

import {Button, Divider } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const LeftTabs = (props) => {
    const { handleChange, classes , handlegmFilterChange, handleOpen, gmfilter, value, gmdata , EditModelopen } = props;

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