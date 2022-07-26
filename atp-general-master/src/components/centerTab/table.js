import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableToolbar from './TableToolbar'
import TableHeader from './TableHeader'
import { makeStyles } from '@material-ui/core/styles'
import { CustomTablePagination } from './tablePagination'

import {
  lighten,
  darken,
  fade,
} from '@material-ui/core/styles/colorManipulator'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FormControlLabel, Switch } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';


function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const CenterTab = (props) => {
  //const classes = useStyles({ ...props })

  const { toolbar, value, showTitle, classes , showSearch, showButton, columnData, page ,rowsPerPage, rowsPerPageOptions, size, stripped, hovered , checkcell, bordered, data, formState , filterText , title,  handleOpen  , orderBy , handleAnchorOpen , pagination , EditAnchorOpen , handleUserInput , handleRequestSort, handlepageChange, handleChangeRowsPerPage ,EditStatus} = props

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

   
   
  const renderCell = (dataArray, keyArray) =>

    keyArray.map((itemCell, index) => (
      <TableCell
        align={itemCell.numeric ? 'right' : 'left'}
        key={index.toString()}
      >
        {(() => {
          const datasss = dataArray.coding[0];
          if(dataArray.coding.length > 0)
          {
          if (itemCell.id === "status") {
            return <FormControlLabel control={<Switch checked={datasss[itemCell.id]} onChange={(e) => EditStatus(dataArray)} name="Status" />} />
          }

          else if(itemCell.id === "Edit")
          {
            return <EditIcon className={classes.editiconstyle} onClick ={(e) => EditAnchorOpen(dataArray) } />
          }

          else {

            const datasss = dataArray.coding[0];
            return datasss[itemCell.id]
          }
        }
        })()}

      </TableCell>

    ))

  return (

    <div {...props}>
     
      <TabPanel value={value} index={value}>
        {toolbar ? (
          <TableToolbar
            placeholder="Search Code and Description"
            filterText={filterText}
            onUserInput={(event) => handleUserInput(event)}
            showTitle={showTitle}
            showButton={showButton}
            showSearch={showSearch}
            title={title}
            toolbar={toolbar}
            handleAnchorOpen={handleAnchorOpen}
          />
        ) : null}
        <div className={classes.tableWrapper}>
          <Table
            className={classNames(
              classes.table,
              hovered && classes.hover,
              stripped && classes.stripped,
              bordered && classes.bordered,
              classes[size],
            )}
          >
            <TableHeader
              order={props.order}
              orderBy={orderBy}
              rowCount={data.length}
              columnData={columnData}
              onRequestSort={(e, p) => handleRequestSort(e, p)}
            />
            <TableBody>
              {columnData !== undefined ? (
                pagination ? (
                  <>
                    {data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                      .map((n, index) => {

                        return (
                          <TableRow
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
        {pagination && (
          <CustomTablePagination
            count={data.length}
            handlepageChange={(event) => handlepageChange(event)}
            rowsPerPageOptions={rowsPerPageOptions}
            handleChangeRowsPerPage={(event) =>
            handleChangeRowsPerPage(event)
            }
          />
        )}

      </TabPanel>
    </div>
  )
}



export default CenterTab