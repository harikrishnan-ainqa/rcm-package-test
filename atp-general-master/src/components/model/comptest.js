import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import { Paper, FormControlLabel  , Switch} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import CloseIcon from '@material-ui/icons/Close';


export default function TestComp(props) {

  const titleStyle = {

    fontSize: "16px",
    fontWeight: "bold"

  }

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title" >
          <p style={titleStyle}> New General Master
            <CloseIcon onClick={props.onClose} style={{ float: "right", cursor: "pointer" }} />
          </p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Paper style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }}>

              <Grid container spacing={2}>
                <Grid item md={3}>
                  <FormLabel> Code</FormLabel>
                  <br />
                  <TextField size="small" id="outlined-basic" name="Code" onChange={props.onTextChange} value={props.inputValue.Code} variant="outlined" />
                </Grid>
                <Grid item md={3}>
                  <FormLabel>Short Description</FormLabel>
                  <br />
                  <TextField size="small" type="text" id="outlined-basic" name="ShortDescription" onChange={props.onTextChange} value={props.inputValue.ShortDescription} variant="outlined" />
                </Grid>
                <Grid item md={3}>
                  <FormLabel> Long Description</FormLabel>
                  <br />
                  <TextField size="small" type="text" id="outlined-basic" name="LongDescription" onChange={props.onTextChange} value={props.inputValue.LongDescription} variant="outlined" />
                </Grid>
                <Grid item md={3}>
                  <FormLabel> Status</FormLabel>
                  <br />
                  <FormControlLabel control={<Switch  checked={props.inputValue.Status} name="Status" onChange={props.onTextChange} />} label={props.inputValue.Status ? "In Active" : "Active"} />
                </Grid>

              </Grid>

            </Paper>
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button variant="contained" size="small" color="primary" onClick={props.handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )

}