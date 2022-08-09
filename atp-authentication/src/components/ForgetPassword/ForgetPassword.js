import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { TextField } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const validateEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const ForgetPassword = (props) => {
    const { classes , handleLogin  , handleCloseresetPassword} = props
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = event => event.preventDefault();

    const [passwordInputs, setpasswordInputs] = useState({
        Email: "",
        Password:""
    })
    const [errors, setError] = useState({
       
        Email: "",
        Password:""

    })
    const handleChange = ({ target: { name, value } }) => {
        setpasswordInputs({ ...passwordInputs ,  [name]: value })
        checkValidity(name , value)
    }

    const checkValidity = (name, value) => {
        switch (name) {
            
            case 'Email': {
                if (!value) {
                    setError({ ...errors, Email: 'Email is required' });
                } else if (!validateEmail.test(value)) {
                    setError({ ...errors, Email: 'Please Enter Valid Email Id' });
                }
                else {
                    setError({ ...errors, Email: '' });
                }
                break;
            }
        }
    }

    const validate = () => {
        let errorEmail = "";
        let errorPassword = "";
        if (!passwordInputs.Email) {
            errorEmail = "Email Id Is Required"
        }

        else if (!validateEmail.test(passwordInputs.Email)) {
            errorEmail = "Please enter valid Email Id"
        }

        if (!passwordInputs.Password) {
            errorPassword = "Password Is Required"
        }

        if (errorEmail || errorPassword) {
            setError({
                Email: errorEmail,
                Password: errorPassword
            })
            return false
        }
        else {

            return true
        }

    }

    const handleSubmit = (event) => {
    event.preventDefault();

    const Validate = validate();

    if(Validate)
    {
        ResetPassord();
    }

    }

    const ResetPassord = () => {

        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           var raw = JSON.stringify({
               email: passwordInputs.Email,
               password: passwordInputs.Password,
             });
           var requestOptions = {
               method: "POST",
               headers: myHeaders,
               body: raw,
               redirect: "follow",
             };
        const data = fetch(
             "https://idmservices.dev.ainqaplatform.in/reset_keycloackuser",
             requestOptions
           ).then((data) => data.json())
             .then((response) => {
                console.log("Response" , response)

                let errorss = false;
                if(response?.Code === "201")
                {
                    errorss = false;
                    handleCloseresetPassword( errorss , response?.Result)
                    setpasswordInputs({
                        Email: "",
                        Password:""
                    })

                }

                else{
                    errorss = true;
                    handleCloseresetPassword( errorss , response?.error)
                }

             })
    }

    return (

        <Paper className={classes.paperWrap}>

            <div className={classes.topBar}>
                <Typography variant="h4" className={classes.title1}>
                    Reset Password
                </Typography>

            </div>
            <div className={classes.centerContent}>
            <FormControl className={classes.formControl}>
            <FormLabel className={classes.label}> Email <span className={classes.spaninp}>*</span></FormLabel>
                <TextField
                    name="Email"
                    onChange={handleChange}
                    placeholder="Email"
                    className={classes.field}
                    value={passwordInputs.Email}
                    variant="outlined"
                />
                {errors?.Email ? (
                        <p className={classes.errorStyle}>{errors.Email}</p>
                    ) :
                        (
                            ''
                        )}
            </FormControl>
            <FormControl className={classes.formControl}>
                        <FormLabel className={classes.label}> Password <span className={classes.spaninp}>*</span></FormLabel>
                        <TextField
                            name="Password" onChange={handleChange}
                            value={passwordInputs.Password}
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            autocomplete="on"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            className={classes.field}
                        />
                        {errors?.Password ? (
                            <p className={classes.errorStyle}>{errors.Password}</p>
                        ) :
                            (
                                ''
                            )}
                    </FormControl>
            <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                    Reset Password
                    <ArrowForward className={classes.rightIcon} />
                </Button>
            </div>
            <div className={classes.optArea}>

                <Button size="small" className={classes.buttonLink} onClick={handleLogin} >
                    Back To Login
                </Button>
            </div>
            </div>
        </Paper>


    )


}

export default ForgetPassword;