import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
//import TablePagination from '@material-ui/core/TablePagination';
import styles from './tableStyle';
import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import { Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { CustomTablePagination } from "./tablePagination";
//import axios from "axios";
import { getData } from "atp-table-binders"




const useStyles = (props) =>
    makeStyles((theme) => ({
        root: {},

    }));

function MuiTable(props) {
      
    const [formState, setFormState] = useState({
        order: props.order,
        orderBy: props.orderBy,
        selected: props.selected,
        columnData: props.columnData,
        data: [],
        page: props.page,
        rowsPerPage: props.rowsPerPage,
        defaultPerPage: props.defaultPerPage,
        filterText: props.filterText,
        size: props.size,
        bordered: props.bordered,
        stripped: props.stripped,
        hovered: props.hovered,
        toolbar: props.toolbar,
        checkcell: props.checkcell,
        pagination: props.pagination,
        filterText: props.filterText,
        showSearch: props.showSearch,
        showButton: props.showButton,
        showTitle: props.showTitle,
        title: props.title,
        rowsPerPageOptions: props.rowsPerPageOptions

    });

    useEffect(() => {
        getResponse()
    }, [])

    const getResponse = async () => {

        var URl = "http://164.52.210.54:8080";
        var db_name = "Ainqa2";
        var entity = "TableData";
        let data = await getData(URl,db_name, entity);
        if(data.Code === 201)
        {
            setFormState({ ...formState,
            data:data.result
        })
        }
    }
    const { classes } = props;
    const {
        data,
        orderBy,
        rowsPerPage,
        page,
        filterText,
        columnData,
    } = formState;

    const handleUserInput = value => {

        setFormState({
            ...formState,
            filterText: value.toLowerCase()
        });
    }

    const handleRequestSort = (event, property) => {
        const { orderBy, order, data } = formState;
        const orderByConst = property;
        let orderLet = 'desc';

        if (orderBy === property && order === 'desc') {
            orderLet = 'asc';
        }

        const dataConst = orderLet === 'desc'
            ? data.sort((a, b) => (b[orderByConst] < a[orderByConst] ? -1 : 1))
            : data.sort((a, b) => (a[orderByConst] < b[orderByConst] ? -1 : 1));


        setFormState({
            ...formState,
            data: dataConst,
            order: orderLet,
            orderBy: orderByConst
        });

    };

    const handlepageChange = (event) => {
        //    const { data } = formState
        setFormState({
            ...formState,
            page: event - 1
        });

    }


    const handleChangeRowsPerPage = (event) => {

        setFormState({
            ...formState,
            rowsPerPage: event
        });
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));

    const renderCell = (dataArray, keyArray) => keyArray.map((itemCell, index) => (
        <TableCell align={itemCell.numeric ? 'right' : 'left'} key={index.toString()}>{dataArray[itemCell.id]}</TableCell>
    ));

    return (
        <Grid className={classes.rootTable}>
            <Grid item xs={12}>
                <Paper className={classes.rootTable}>

                    {props.toolbar ?
                        <TableToolbar
                            placeholder="Search Code and Description"
                            filterText={filterText}
                            onUserInput={(event) => handleUserInput(event)}
                            showTitle={props.showTitle}
                            showButton={props.showButton}
                            showSearch={props.showSearch}
                            title={props.title}
                            toolbar={props.toolbar}
                        />
                        :
                        null
                    }
                    <div className={classes.tableWrapper}>
                        <Table className={
                            classNames(
                                classes.table,
                                props.hovered && classes.hover,
                                props.stripped && classes.stripped,
                                props.bordered && classes.bordered,
                                classes[props.size]
                            )}
                        >
                            <TableHeader
                                order={props.order}
                                orderBy={orderBy}
                                rowCount={data.length}
                                columnData={props.columnData}
                                onRequestSort={(e, p) => handleRequestSort(e, p)}

                            />
                            <TableBody>
                                {props.columnData !== undefined ?
                                props.pagination ?
                                    <>
                                        {
                                            data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => {

                                                if (n.name.toLowerCase().indexOf(filterText) === -1) {
                                                    return false;
                                                }
                                                return (
                                                    <TableRow
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={n.id}
                                                    >

                                                        {renderCell(n, columnData)}
                                                    </TableRow>
                                                );
                                            })
                                        }
                                    </>

                                    :
                                    <>
                                        {
                                            data.map(n => {

                                                if (n.name.toLowerCase().indexOf(filterText) === -1) {
                                                    return false;
                                                }
                                                return (
                                                    <TableRow
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={n.id}
                                                    >

                                                        {renderCell(n, columnData)}
                                                    </TableRow>
                                                );
                                            })
                                        }
                                    </>
                                    :
                                 null
                                }
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    {props.pagination && (
                        <CustomTablePagination
                            count={data.length}
                            handlepageChange={(event) => handlepageChange(event)}
                            rowsPerPageOptions={props.rowsPerPageOptions}
                            handleChangeRowsPerPage={(event) => handleChangeRowsPerPage(event)}
                        />
                    )}
                </Paper>
            </Grid>
        </Grid>

    )
}

MuiTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

MuiTable.defaultProps = {
    toolbar: false,
    showTitle: true,
   showSearch: true,
    showButton: true,
   columnData: [
       {
           id: 'name',
           numeric: false,
           //disablePadding: false,
           label: 'Dessert (100g serving)'
       }, 
       {
           id: 'calories',
           numeric: true,
          
           label: 'Calories'
       }, {
           id: 'fat',
           numeric: true,
          
           label: 'Fat (g)'
       }, {
           id: 'carbs',
           numeric: true,
           
           label: 'Carbs (g)'
       }, {
           id: 'protein',
           numeric: true,
           label: 'Protein (g)'
       },
   ],
   page: 0,
   rowsPerPage: 10,
   defaultPerPage: 5,
   filterText: '',
   size: 'medium',
   bordered: false,
   stripped: false,
   hovered: true,
   toolbar: true,
   checkcell: false,
   pagination: true,
   title: "Table",
   TableCount: 10,
    rowsPerPageOptions: [
        { label: "10 Rows", value: 10 },
        { label: "20 Rows", value: 20 },
       { label: "30 Rows", value: 30 },
    ]

}


export default withStyles(styles)(MuiTable);