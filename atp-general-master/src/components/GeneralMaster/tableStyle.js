import { lighten, darken, fade } from '@material-ui/core/styles/colorManipulator';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { capitalize } from '@material-ui/core';
const styles = theme => ({
  root: {
    paddingRight: theme.spacing(1),
  },
  rootTable: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margingBottom:"15px",
    backgroundColor:"#fff"
  },
  highlight:
    theme.palette.type === 'light' ? {
      color: theme.palette.secondary.main,
      backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    } : {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.secondary.dark,
    },
  spacer: {
    flex: '1 1 100%',
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  flex: {
    display: 'flex'
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
    border:"1px solid #f4f4f5"
  },

  tableSmall: {
    minWidth: 500,
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  toolbar: {
    backgroundColor: "#f4f4f5",
    minHeight: 36,
    // border:`1px solid ${theme.palette.grey[900]}`,
    borderRadius:"5px",
    marginTop:"8px"

  },
  tableWrapper:{
marginTop:"5px",
padding:"20px"
  },
  title: {
    flex: '0 0 auto',
    '& h6': {
      fontSize: 20,
      fontWeight:"bold",
      color: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.2) : darken(theme.palette.primary.dark, 0.2),
    }
  },
  Button: {
    margin: `${theme.spacing(1)}px 0`,
    padding:"5px 16px",
    float:"right",
    backgroundColor:"#f33004",
    '&:hover': {
        backgroundColor: '#f33004 !important',
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
    color: theme.palette.common.white
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
      background: "#f4f4f5"
    }
  },
  hover: {
    '& tbody tr:hover': {
      background: "#f4f4f5"
    }
  },
  bordered: {
    border: "1px solid #f4f4f5",
    '& thead tr': {
      background: "#f4f4f5"
    },
    '& td, th': {
      border: "#f4f4f5"
    },
    '& tr td, tr th': {
      '&:first-child': {
        borderLeft: 'none'
      },
      '&:last-child': {
        borderRight: 'none'
      }
    }
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
    }
  },
  small: {
    '& tr': {
      height: 24,
      '& td, th': {
        padding: '4px 10px',
        fontSize: 12
      }
    }
  },
  medium: {
    '& tr': {
      height: 48,
      '& td, th': {
        padding: '4px 56px 4px 24px',
        fontSize: 14
      }
    }
  },
  big: {
    '& tr': {
      height: 64,
      '& td, th': {
        padding: '8px 56px 8px 24px',
        fontSize: 18
      }
    }
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
    }
  },
  down: {
    color: red[500],
    '& svg': {
      fill: red[500],
    }
  },
  flat: {
    color: theme.palette.divider,
    '& svg': {
      fill: theme.palette.divider,
    }
  },
  chartTable: {
    '& svg': {
      '& [class*="recharts-bar-rectangle"] path': {
        fill: fade(theme.palette.primary.main, 0.5)
      }
    }
  }
});

export default styles;
