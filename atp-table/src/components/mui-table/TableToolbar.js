import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import styles from './tableStyle';

import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';

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
        toolbar

    } = props;

    const handleChange = useCallback((event) => {

        event.persist();
        onUserInput(event.target.value);
    }, [onUserInput]);

    debugger
    return (

        <Grid item xs={12}>
            {toolbar ?
                <Grid container className={classes.settings}>
                    <Grid item xs={7}>
                        <div className={classes.title}>
                            {showTitle ?
                                <Typography variant="h6">{title}</Typography>
                                :
                                null
                            }
                        </div>
                    </Grid>
                    <Grid item xs={2.5}>
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

                    </Grid>

                    <Grid item xs={1.5}>
                        {/* <div className={classes.spacer} /> */}
                        {showButton ?
                            <Button className={classes.Button} variant="contained" endIcon={<AddIcon style={{ color: "#fff" }} />}>
                                <span style={{ fontSize: "14px", textTransform: "capitalize", fontWeight: "bold", color: "#fff" }}>Add New</span>
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