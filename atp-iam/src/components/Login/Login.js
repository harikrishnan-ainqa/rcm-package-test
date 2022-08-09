import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { TextField } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import config from "../../utils/config";


const validateEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const Login = (props) => {
    const { classes, handleForgetPassword, handleSignup, handleCloseLogin } = props
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = event => event.preventDefault();

    const [loginInputs, setloginInputs] = useState({
        Email: "",
        Password: ""
    })

    const [errors, setErrors] = useState({

        Email: "",
        Password: ""
    })

    const [loading, setLoading] = useState(false);

    // Input Change

    const handleChange = ({ target: { name, value } }) => {
        setloginInputs({ ...loginInputs, [name]: value })
    }


    // Error Handling

    const validate = () => {
        let errorEmail = "";
        let errorPassword = "";
        if (!loginInputs.Email) {
            errorEmail = "Email Id Is Required"
        }

        else if (!validateEmail.test(loginInputs.Email)) {
            errorEmail = "Please enter valid Email Id"
        }

        if (!loginInputs.Password) {
            errorPassword = "Password Is Required"
        }

        if (errorEmail || errorPassword) {
            setErrors({
                Email: errorEmail,
                Password: errorPassword
            })
            return false
        }
        else {

            return true
        }

    }

    // Submit
    const handleSubmit = (event) => {
        event.preventDefault();
        userLogin();

    }

    const userLogin = async () => {

        const Validate = validate();

        if (Validate) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
           var raw = JSON.stringify({
               username: loginInputs.Email,
               password: loginInputs.Password,
             });
           var requestOptions = {
               method: "POST",
               headers: myHeaders,
               body: raw,
               redirect: "follow",
             };

             const data = fetch(
                "https://idmservices.dev.ainqaplatform.in/login_keycloackuser",
                requestOptions
              ).then((data) => data.json())
                .then((response) => {
                    console.log("response" ,  response)
                    let errorss = false;
                    if(response?.Code === "201")
                    {
                        localStorage.setItem("access_token" , response?.tokenDetails?.access_token)

                        errorss = false
                        handleCloseLogin(errorss, "Login Succesfully")
        
                        setloginInputs({
                            Email: "",
                            Password: ""
                        })
                    }

                    else
                    {
                        {console.log("response?.error" , response?.error)}
                        errorss = true
                        handleCloseLogin(errorss, response?.error)
                    }
                }
                );
           

        }

    }

    return (
        <Paper className={classes.paperWrap}>
            <form>
                <div className={classes.topBar}>
                    <Typography variant="h4" className={classes.title}>
                        Login
                    </Typography>
                    <Button size="small" className={classes.buttonLink} onClick={handleSignup}  >
                        <ArrowForward className={classes.rightIcon} />
                        Create New Account
                    </Button>
                </div>
                <div className={classes.centerContent}>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.label}> Email <span className={classes.spaninp}>*</span></FormLabel>
                        <TextField
                            name="Email"
                            onChange={handleChange}
                            placeholder="Email"
                            className={classes.field}
                            value={loginInputs.Email}
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
                            value={loginInputs.Password}
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

                    <div className={classes.optArea}>

                        <Button size="small" className={classes.buttonLink} onClick={handleForgetPassword}>
                            Forget Password
                        </Button>
                    </div>

                    <div className={classes.btnArea}>
                        <Button variant="contained" disabled={loading} fullWidth color="primary" size="large" type="button" onClick={handleSubmit}>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                            Login
                            {!loading && <ArrowForward className={classes.rightIcon} />}
                        </Button>
                    </div>
                </div>
            </form>
        </Paper>

    )
}

export default Login;