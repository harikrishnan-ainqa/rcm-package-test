import React, { useEffect, useState } from 'react';
import TextField from "@material-ui/core/TextField";
import { Button, Paper } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
export default function TestComp(props)
{


return(

 <Paper style={{marginBottom:"20px" ,padding:"10px" ,  marginTop:"20px"}}>
      
      <Grid container spacing={2}>
      <Grid item xs={12}>
      <h2 style={{fontSize:"18px" , fontWeight:"bold" , textTransform:"uppercase"}}>Form Demo</h2>
      </Grid>
      <Grid item md={4}>
        <FormLabel> Name</FormLabel>
        <br />
      <TextField size="small" id="outlined-basic" name="name" onChange={props.onTextChange} value={props.inputValue.name} variant="outlined" />
      </Grid>
      <Grid item md={4}>
      <FormLabel> Calories</FormLabel>
      <br />
      <TextField size="small"  type="number" id="outlined-basic" name="calories" onChange={props.onTextChange} value={props.inputValue.calories} variant="outlined" />
      </Grid>
      <Grid item md={4}>
      <FormLabel> Carbs</FormLabel>
      <br />
      <TextField size="small" type="number" id="outlined-basic" name="carbs" onChange={props.onTextChange} value={props.inputValue.carbs} variant="outlined" />
      </Grid>
      <Grid item md={4}>
      <FormLabel> Fat</FormLabel>
      <br />
      <TextField size="small"  type="number" id="outlined-basic" name="fat" onChange={props.onTextChange} value={props.inputValue.fat} variant="outlined" />
      </Grid>
      <Grid item md={4}>
      <FormLabel> Protein</FormLabel>
      <br />
      <TextField size="small"  type="number" id="outlined-basic" name="protein" onChange={props.onTextChange} value={props.inputValue.protein} variant="outlined" />
      </Grid>
      </Grid>
      
    </Paper>

    
)

}