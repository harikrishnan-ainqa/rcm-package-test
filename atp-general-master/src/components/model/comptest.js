import React, { useState , useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import { Paper, FormControlLabel, Switch } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import CloseIcon from '@material-ui/icons/Close';
import withTheme from '../../themeProvider'
import withStyleFix from '../../stylefix'
import { makeStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import {
  lighten,
  darken,
  fade,
} from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';



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
  spaninp: {

    color: "#f70404"
  },


  Addnewbutton: {
    float: "right"

  },

  content: {
    marginbottom: "20px"
  },
  labelStyle: {

    fontSize: "13px !important"
  },
  contentStyle:{
    overflow:"hidden"
  }

}))

const TestComp = (props) => {
  const classes = useStyles({ ...props })

  const titleStyle = {

    fontSize: "16px",
    fontWeight: "bold"

  }

  const [inputvalue, setinputvalue] = useState({
    MasterType: "",
    MasterName: "",
  })

  const [AdditionalColumns , setAdditionalColmns] = useState([])

  const { onClose, open , columnType, EditModel, ModelEditValue , db_name , URL , metadataId , metadata_dbname} = props;


 
  useEffect(() => {

    if(EditModel === true)
    {
     
      getData(ModelEditValue);
 
    }

    else if(EditModel === false)
    {
      setinputvalue({
        MasterType: "",
        MasterName: "",
      })
      setAdditionalColmns([]);
    }

  },[EditModel]);


  const getData = (ModelEditValue) => {
    setinputvalue({     
      MasterType: ModelEditValue.gentype,
      MasterName: ModelEditValue.genname,
    })
  }
  const onTextChange = (e) => {

    if (e.target.name === "Status") {
      setinputvalue({ ...inputvalue, "Status": !inputvalue.Status })
    }

    else {
      setinputvalue({ ...inputvalue, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async () => {

    if(EditModel === true)
    {
      //EditSidebar();
    }

    else{
      AddSideBar();
    }

  }


//   const AddSideBar = () => {

//     const doc = {
//       genname:inputvalue.MasterName,
//       gentype:inputvalue.MasterType,
//       additionalcolumns:AdditionalColumns
//     }

//     const payload ={
//       db_name:db_name,   
//       entity: "GMdefinition",
//       is_metadata: true,
//       metadataId:metadataId,
//       metadata_dbname:metadata_dbname,
//       doc:doc,
//       return_fields:"GMdefinition"
   
//   }
//   let datass = JSON.stringify([payload]);
//   var config = {
//     method: 'post',
//     url: `${URL}/api/upsert_document`,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: datass
//   }

//   await axios(config)
//   .then(async response => {
//     if(response.data.Code === 201)
//     {
//         console.log("response" ,response)
//     }
    
//   })
 

// }

  

  const AddNewField = () => {

    const data = {	
    ColumnName:"",
    ColumnType:"",
    ColumnSize:"",
    mandatory:false
  }
    const datassss = [...AdditionalColumns];
    datassss.push(data)
    setAdditionalColmns(datassss);
  }



  const handleRemovevalue = (index) => {
    const values = [...AdditionalColumns];
    values.splice(index, 1);
    setAdditionalColmns(values);
  };

  const setValue = (index, event) => {
    const values = [...AdditionalColumns];
    const updatedValue = event.target.name;
    if(updatedValue === "mandatory")
    {
      const newValue = values[index][updatedValue];
      values[index][updatedValue] = !newValue;
    }

    else{
      values[index][updatedValue] = event.target.value;
    }
    setAdditionalColmns(values);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title" >
          <p style={titleStyle}> New General Master
            <CloseIcon onClick={onClose} style={{ float: "right", cursor: "pointer" }} />
          </p>
        </DialogTitle>
        <DialogContent className={classes.contentStyle}>
          <DialogContentText id="alert-dialog-description">


            <Grid container className={classes.content} spacing={2}>
              <Grid item md={4}>
                <FormLabel> Master Type <span className={classes.spaninp}>*</span></FormLabel>
                <br />
                <input aria-invalid="false" type="text" name="MasterType" value={inputvalue.MasterType} onChange={onTextChange} className={classes.inputstyle} />

              </Grid>
              <Grid item md={6}>
                <FormLabel> Master Name <span className={classes.spaninp}>*</span></FormLabel>
                <br />
                <input aria-invalid="false" type="text" name="MasterName" value={inputvalue.MasterName} onChange={onTextChange} className={classes.inputstyle} />
              </Grid>
            </Grid>
            <hr />
            <Grid item md={12} className={classes.content}>
              <p style={titleStyle}> Standard Columns </p>
            </Grid>

            <Grid container className={classes.content} spacing={2}>
              <Grid item md={3}>
                <FormLabel className={classes.labelStyle}> Code(20 Chars) <span className={classes.spaninp}>*</span></FormLabel>
              </Grid>
              <Grid item md={3}>
                <FormLabel> Short Description (60 Chars) <span className={classes.spaninp}>*</span></FormLabel>
              </Grid>
              <Grid item md={4}>
                <FormLabel> Long Description (100 Chars) <span className={classes.spaninp}>*</span></FormLabel>
              </Grid>
              <Grid item md={2}>
                <FormLabel> Status (Y/N) <span className={classes.spaninp}>*</span></FormLabel>
              </Grid>
            </Grid>

            <Grid item md={12} className={classes.content}>
              <p style={titleStyle}> Additional Columns
                <Button className={classes.Addnewbutton} variant="contained" size="small" color="primary" startIcon={<AddIcon style={{ color: "#fff" }} />} onClick={AddNewField}>

                  Add New
                </Button>
              </p>
            </Grid>
            <hr />
           
            {AdditionalColumns && AdditionalColumns.length ?
              AdditionalColumns.map((val, index) => {
                return (
                  <Grid container className={classes.content} spacing={2}>
                    <Grid item md={3}>
                      <FormLabel> Column Name <span className={classes.spaninp}>*</span></FormLabel>
                      <br />
                      <input aria-invalid="false" type="text" name="ColumnName" value={val.ColumnName} onChange={(event) => setValue(index, event)} className={classes.inputstyle} />
                    </Grid>
                    <Grid item md={3}>
                      <FormLabel> Column Type <span className={classes.spaninp}>*</span></FormLabel>
                      <br />
                      <select value={val.ColumnType} className={classes.inputstyle}  name="ColumnType" onChange={(event) => setValue(index, event)} >
                      <option value="">Chooseee Column Type</option>

                      {columnType.length > 0 ? columnType.map((valuesss, index) => (
                          <option value={valuesss._id}>{valuesss.display}</option>
                        ))
                        : null}
                        

                      </select>
                      {/* <input aria-invalid="false" type="text" name="ColumnType" value={val.ColumnType} onChange={(event) => setValue(index, event)} className={classes.inputstyle} /> */}
                    </Grid>
                    <Grid item md={3}>
                      <FormLabel>Column Size</FormLabel>
                      <br />
                      <input aria-invalid="false" type="text" name="ColumnSize" value={val.ColumnSize} onChange={(event) => setValue(index, event)} className={classes.inputstyle} />
                    </Grid>
                    <Grid item md={2}>
                      <FormLabel>Mandatory</FormLabel>
                      <br />
                      <FormControlLabel control={<Switch  checked={val.mandatory} name="mandatory" onChange={(event) => setValue(index, event)} />}  />
           

                    </Grid>
                    <Grid item md={1}>
                      <FormLabel>Delete</FormLabel>
                      <br />
                      <DeleteIcon onClick={(e, value) => { handleRemovevalue(index) }} />
                    </Grid>
                  </Grid>
                )
              })
              : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button variant="contained" size="small" color="primary" onClick={handleSubmit}>
            {EditModel === false ? "Save" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

}

export default withStyleFix(withTheme(TestComp))