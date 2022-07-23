import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

function TableHeader(props) {

    const {
      classes,
        order,
        orderBy,
        columnData,
        onRequestSort
      } = props;

      const createSortHandler = (event, property) => {
        onRequestSort(event, property);
      };

      return(

        <TableHead style={{backgroundColor:"#f4f4f5"}}>
        <TableRow>
        {columnData !== undefined ? 
          columnData.length > 0 ? 
          columnData.map(column => (
          <TableCell
            padding="default"
            key={column.id}
            align={column.numeric ? 'right' : 'left'}
            sortDirection={orderBy === column.id ? order : false}
          >
            <Tooltip
              title="Sort"
              placement={column.numeric ? 'bottom-end' : 'bottom-start'}
              enterDelay={300}
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={order}
                onClick={(e) => createSortHandler(e, column.id)}
              >
                {column.label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        )) :
        null
        
        : null
      }
        </TableRow>
    </TableHead>
      )
}


TableHeader.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    columnData: PropTypes.array.isRequired,
  };


  
  export default TableHeader;