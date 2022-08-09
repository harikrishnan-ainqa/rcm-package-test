import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { TextField } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import config from "../../utils/config";

const validateEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const SignUp = (props) => {

    const { classes, handleLogin, handleCloseSignup } = props;
    const [SignUpInputs, setSignUpInputs] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
    });

    const [errors, setError] = useState({
        FirstName: "",
        LastName: "",
        Email: "",

    })

    const handleChange = ({ target: { name, value } }) => {
        setSignUpInputs({ ...SignUpInputs, [name]: value })
        checkValidity(name, value);
    }
    // On Change Validation
    const checkValidity = (name, value) => {
        switch (name) {
            case 'FirstName': {
                if (!value) {
                    setError({ ...errors, FirstName: 'First Name is required' });
                } else {
                    setError({ ...errors, FirstName: '' });
                }
                break;
            }
            case 'LastName': {
                if (!value) {
                    setError({ ...errors, LastName: 'Last Name is required' });
                } else {
                    setError({ ...errors, LastName: '' });
                }
                break;
            }
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
        let errorFirstName = "";
        let errorLastName = "";

        if (!SignUpInputs.FirstName) {
            errorFirstName = "First Name Is Required";
        }

        if (!SignUpInputs.LastName) {
            errorLastName = "Last Name Is Required";
        }

        if (!SignUpInputs.Email) {
            errorEmail = "Email Id Is Required"
        }

        else if (!validateEmail.test(SignUpInputs.Email)) {
            errorEmail = "Please enter valid Email Id"
        }

        if (errorEmail || errorFirstName || errorLastName) {
            setError({
                FirstName: errorFirstName,
                LastName: errorLastName,
                Email: errorEmail,
            })
            return false;
        }

        else {
            return true;
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        CreateUser()

    }

    const CreateUser = async () => {

        const Validate = validate();

        if (Validate) {

            const Payload = {
                username: SignUpInputs.Email,
                enabled: true,
                totp: false,
                emailVerified: false,
                firstName: SignUpInputs.FirstName,
                lastName: SignUpInputs.LastName,
                email: SignUpInputs.Email,
                disableableCredentialTypes: [],
                requiredActions: [],
                notBefore: 0,
                access: {
                    manageGroupMembership: true,
                    view: true,
                    mapRoles: true,
                    impersonate: true,
                    manage: true
                },
                realmRoles: []

            }
            var encoded = btoa(JSON.stringify(Payload));

            // console.log("encoded" , encoded)

            const data = await fetch(`${config.Api_Url}/api/v1/atpcreateuser`, {
                method: "POST",
                headers: {

                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: encoded
            }).then((data) => data.json())
                .then((response) => response);
            if (data?.error === false) {
                setSignUpInputs({
                    FirstName: "",
                    LastName: "",
                    Email: "",
                })
                handleCloseSignup(data?.error, data?.OTP?.Message)

            }

            else if (data?.error === true) {

                handleCloseSignup(data?.error, data?.errorMessage)
            }

        }

    }


    return (
        <Paper className={classes.paperWrap}>
            <div className={classes.topBar}>
                <Typography variant="h4" className={classes.title}>
                    Create New Account
                </Typography>
                <Button size="small" className={classes.buttonLink} onClick={handleLogin} >
                    <ArrowForward className={classes.rightIcon} />
                    Already Have An Account
                </Button>
            </div>
            <div className={classes.centerContent}>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.label}> First Name <span className={classes.spaninp}>*</span></FormLabel>
                    <TextField
                        name="FirstName"
                        onChange={handleChange}
                        placeholder="First Name"
                        className={classes.field}
                        value={SignUpInputs.FirstName}
                        variant="outlined"
                    />
                    {errors?.FirstName ? (
                        <p className={classes.errorStyle}>{errors.FirstName}</p>
                    ) :
                        (
                            ''
                        )}
                </FormControl>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.label}>Last Name <span className={classes.spaninp}>*</span></FormLabel>
                    <TextField
                        name="LastName"
                        onChange={handleChange}
                        placeholder="Last Name"
                        className={classes.field}
                        value={SignUpInputs.LastName}
                        variant="outlined"
                    />
                    {errors?.LastName ? (
                        <p className={classes.errorStyle}>{errors.LastName}</p>
                    ) :
                        (
                            ''
                        )}
                </FormControl>
                <FormControl className={classes.formControl}>
                    <FormLabel className={classes.label}>Email<span className={classes.spaninp}>*</span></FormLabel>
                    <TextField
                        name="Email"
                        onChange={handleChange}
                        placeholder="Email"
                        className={classes.field}
                        value={SignUpInputs.Email}
                        variant="outlined"
                    />
                    {errors?.Email ? (
                        <p className={classes.errorStyle}>{errors.Email}</p>
                    ) :
                        (
                            ''
                        )}
                </FormControl>

                <div className={classes.btnArea}>
                    <Button variant="contained" fullWidth color="primary" size="large" type="button" onClick={handleSubmit}>
                        Register
                        <ArrowForward className={classes.rightIcon} />
                    </Button>
                </div>


            </div>
        </Paper>

    )


}

export default SignUp;