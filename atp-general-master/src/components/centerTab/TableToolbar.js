import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from './tableStyle';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { messageCatalogGetter } from "../../utils/common/function";
function TableToolbar(props) {

    const {

        classes,
        filterText,
        placeholder,
        onUserInput,
        showTitle,
        showButton,
        showSearch,
        title,
        toolbar,
        handleAnchorOpen

    } = props;

    const handleChange = useCallback((event) => {

        event.persist();
        onUserInput(event.target.value);
    }, [onUserInput]);

    
    return (

        <Grid item xs={12}>
            {toolbar ?
                <Grid container className={classes.settings}>
                    <Grid item xs={10}>
                        <div className={classes.title}>
                            {showTitle ?
                                <Typography variant="h6">{title}</Typography>
                                :
                                null
                            }
                        </div>
                    </Grid>
                    {/* <Grid item xs={2.5}>
                        {showSearch ?
                            <Toolbar
                                className={classNames(classes.toolbar)}>
                                <div className={classes.actionsToolbar}>
                                    <div className={classes.actions}>
                                        <FormControl className={classNames(classes.textField)}>
                                            
                                            <Input
                                                id="search_filter"
                                                type="text"
                                                placeholder={placeholder}
                                                value={filterText}
                                                onChange={(event) => handleChange(event)}
                                                endAdornment={(
                                                    <InputAdornment position="start">
                                                        <IconButton aria-label="Search filter">
                                                            <SearchIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )}
                                            />
                                        </FormControl>
                                    </div>
                                </div>

                            </Toolbar>

                            :
                            null}

                    </Grid> */}

                    <Grid item xs={2}>
                        {/* <div className={classes.spacer} /> */}
                        {showButton ?
                            <Button className={classes.Buttonstyle} variant="contained" color="primary" onClick={handleAnchorOpen} endIcon={<AddIcon style={{ color: "#fff" }} />}>
                                <span style={{ fontSize: "14px", textTransform: "capitalize", fontWeight: "bold", color: "#fff" }}>{messageCatalogGetter("Add New") ?? "Add New"}</span>
                            </Button>
                            :
                            null
                        }
                    </Grid>
                </Grid>
                :
                <Grid container className={classes.settings}>
                </Grid>
            }
        </Grid>

    )

}

TableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    filterText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onUserInput: PropTypes.func.isRequired,
    numSelected: PropTypes.number.isRequired,
};
export default withStyles(styles)(TableToolbar);