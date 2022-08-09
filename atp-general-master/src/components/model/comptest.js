import React, { useState , useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControlLabel, Switch } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import CloseIcon from '@material-ui/icons/Close';
import withTheme from '../../themeProvider'
import withStyleFix from '../../stylefix'
import { messageCatalogGetter } from "../../utils/common/function";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";




const TestComp = (props) => {
  //const classes = useStyles({ ...props })

  const titleStyle = {

    fontSize: "16px",
    fontWeight: "bold"

  }

  const [inputvalue, setinputvalue] = useState({
    MasterType: "",
    MasterName: "",
  })

  const [AdditionalColumns , setAdditionalColmns] = useState([])

  const { onClose, open , classes , columnType, EditModel, ModelEditValue , db_name , URL , metadataId , metadata_dbname , handleCloseModal,handleGMDelete} = props;

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
      EditSidebar();
    }

    else{
      AddSideBar();
    }

  }


  const AddSideBar = async () => {

    const doc = {
      genname:inputvalue.MasterName,
      gentype:inputvalue.MasterType,
      additionalcolumns:AdditionalColumns,
      issystemdefined: true
    }

    const payload ={
      db_name:db_name,   
      entity: "GMdefinition",
      is_metadata: true,
      metadataId:metadataId,
      metadata_dbname:metadata_dbname,
      doc:doc,
      return_fields:"GMdefinition"
   
  }
  let datass = JSON.stringify([payload]);
  var config = {
    method: 'post',
    url: `${URL}/api/upsert_document`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: datass
  }

  await axios(config)
  .then(async response => {
    if(response.data.Code === 201)
    {
        console.log("response" ,response.data.result)

        handleCloseModal(EditModel , response.data.Result)
    }
    
  })
 

}


const EditSidebar = async () => {

  const doc = {
    genname:inputvalue.MasterName,
    gentype:inputvalue.MasterType,
    additionalcolumns:AdditionalColumns,
    issystemdefined: true
  }

  const payload ={
    db_name:db_name,   
    entity: "GMdefinition",
    is_metadata: true,
    metadataId:metadataId,
    metadata_dbname:metadata_dbname,
    doc:doc,
    filter: {
      "_key": ModelEditValue._key
  },
    return_fields:"GMdefinition"
 
}
let datass = JSON.stringify([payload]);
var config = {
  method: 'post',
  url: `${URL}/api/upsert_document`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: datass
}

await axios(config)
.then(async response => {
  if(response.data.Code === 201)
  {
    handleCloseModal(EditModel , response.data.Result)
  }
  
})

}
  

const handleDelete = async() => {
  const doc = {
    activestatus : !ModelEditValue.activestatus
  }

  const payload ={
    db_name:db_name,   
    entity: "GMdefinition",
    is_metadata: true,
    metadataId:metadataId,
    metadata_dbname:metadata_dbname,
    doc:doc,
    filter: {
      "_key": ModelEditValue._key
  },
    return_fields:"GMdefinition"
 
}
let datass = JSON.stringify([payload]);
var config = {
  method: 'post',
  url: `${URL}/api/upsert_document`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: datass
}

await axios(config)
.then(async response => {
  if(response.data.Code === 201)
  {
    handleGMDelete(EditModel , response.data.Result)
  }
  
})
}

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

                {messageCatalogGetter("Add New") ?? "Add New"}
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

          {EditModel === true ?
           <Button variant="contained" size="small" color="primary" onClick={handleDelete}>Delete</Button>
           :
           ""
        }
        </DialogActions>
      </Dialog>
    </>
  )

}

export default withStyleFix(withTheme(TestComp))