import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import classNames from 'classnames'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableToolbar from './TableToolbar'
import TableHeader from './TableHeader'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CustomTablePagination } from './tablePagination'
//import axios from "axios";
import { getData } from 'atp-table-binders'
import {
  lighten,
  darken,
  fade,
} from '@material-ui/core/styles/colorManipulator'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import withTheme from '../../themeProvider'
import withStyleFix from '../../stylefix'

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
    backgroundColor: '#f33004',
    '&:hover': {
      backgroundColor: '#f15836',
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
      '& td, th': {
        padding: '4px 56px 4px 24px',
        fontSize: 14,
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
}))

const MuiTable = (props) => {
  const classes = useStyles({ ...props })
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
    rowsPerPageOptions: props.rowsPerPageOptions,
  })

  useEffect(() => {
    getResponse()
  }, [])

  const getResponse = async () => {
    var URl = 'http://164.52.210.54:8080'
    var db_name = 'Ainqa2'
    var entity = 'TableData'
    let data = await getData(URl, db_name, entity)
    if (data.Code === 201) {
      setFormState({ ...formState, data: data.result })
    }
  }

  const { data, orderBy, rowsPerPage, page, filterText, columnData } = formState

  const handleUserInput = (value) => {
    setFormState({
      ...formState,
      filterText: value.toLowerCase(),
    })
  }

  const handleRequestSort = (event, property) => {
    const { orderBy, order, data } = formState
    const orderByConst = property
    let orderLet = 'desc'

    if (orderBy === property && order === 'desc') {
      orderLet = 'asc'
    }

    const dataConst =
      orderLet === 'desc'
        ? data.sort((a, b) => (b[orderByConst] < a[orderByConst] ? -1 : 1))
        : data.sort((a, b) => (a[orderByConst] < b[orderByConst] ? -1 : 1))

    setFormState({
      ...formState,
      data: dataConst,
      order: orderLet,
      orderBy: orderByConst,
    })
  }

  const handlepageChange = (event) => {
    //    const { data } = formState
    setFormState({
      ...formState,
      page: event - 1,
    })
  }

  const handleChangeRowsPerPage = (event) => {
    setFormState({
      ...formState,
      rowsPerPage: event,
    })
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

  const renderCell = (dataArray, keyArray) =>
    keyArray.map((itemCell, index) => (
      <TableCell
        align={itemCell.numeric ? 'right' : 'left'}
        key={index.toString()}
      >
        {dataArray[itemCell.id]}
      </TableCell>
    ))

  return (
    <div {...props}>
      <Grid className={classes.rootTable}>
        <Grid item xs={12}>
          <Paper className={classes.rootTable}>
            {props.toolbar ? (
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
            ) : null}
            <div className={classes.tableWrapper}>
              <Table
                className={classNames(
                  classes.table,
                  props.hovered && classes.hover,
                  props.stripped && classes.stripped,
                  props.bordered && classes.bordered,
                  classes[props.size],
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
                  {props.columnData !== undefined ? (
                    props.pagination ? (
                      <>
                        {data
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                          .map((n) => {
                            if (
                              n.name.toLowerCase().indexOf(filterText) === -1
                            ) {
                              return false
                            }
                            return (
                              <TableRow
                                role="checkbox"
                                tabIndex={-1}
                                key={n.id}
                              >
                                {renderCell(n, columnData)}
                              </TableRow>
                            )
                          })}
                      </>
                    ) : (
                      <>
                        {data.map((n) => {
                          if (n.name.toLowerCase().indexOf(filterText) === -1) {
                            return false
                          }
                          return (
                            <TableRow role="checkbox" tabIndex={-1} key={n.id}>
                              {renderCell(n, columnData)}
                            </TableRow>
                          )
                        })}
                      </>
                    )
                  ) : null}
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
                handleChangeRowsPerPage={(event) =>
                  handleChangeRowsPerPage(event)
                }
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

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
      label: 'Dessert (100g serving)',
    },
    {
      id: 'calories',
      numeric: true,

      label: 'Calories',
    },
    {
      id: 'fat',
      numeric: true,

      label: 'Fat (g)',
    },
    {
      id: 'carbs',
      numeric: true,

      label: 'Carbs (g)',
    },
    {
      id: 'protein',
      numeric: true,
      label: 'Protein (g)',
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
  title: 'Table',
  TableCount: 10,
  rowsPerPageOptions: [
    { label: '10 Rows', value: 10 },
    { label: '20 Rows', value: 20 },
    { label: '30 Rows', value: 30 },
  ],
}

export default withStyleFix(withTheme(MuiTable))
