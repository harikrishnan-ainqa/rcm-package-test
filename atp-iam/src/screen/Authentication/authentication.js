import React, { useState, useEffect } from 'react';
import withTheme from '../../themeProvider';
import withStyleFix from '../../stylefix';
import useStyles from "./style";
import { Login } from "../../components/Login";
import { SignUp } from "../../components/SignUp";
import { ForgetPassword } from "../../components/ForgetPassword";
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';


const Authentication = (props) => {

    const classes = useStyles(props);

    const [screens, setScreens] = useState({
        Login: true,
        SignUp: false,
        ForgetPassword: false
    })

    const handleSignup = () => {

        setScreens({
            Login: false,
            SignUp: true,
            ForgetPassword: false
        })

    }

    const handleLogin = () => {

        setScreens({
            Login: true,
            SignUp: false,
            ForgetPassword: false
        })

    }

    const handleForgetPassword = () => {

        setScreens({
            Login: false,
            SignUp: false,
            ForgetPassword: true
        })

    }

const handleCloseSignup = (error , Message) => {

   if(error === false)
   {
    toast.success(Message, {
        autoClose:2000,
        position:  toast.POSITION.TOP_RIGHT,
      });
    setScreens({
        Login: true,
        SignUp: false,
        ForgetPassword: false
    })

   }

   else if(error === true)
   {
    toast.error(Message , {
        autoClose:2000,
        position: toast.POSITION.TOP_RIGHT
    });
   }
    }
    const handleCloseLogin = (error , Message) => {

        if(error === false)
        {
         toast.success(Message, {
             autoClose:2000,
             position:  toast.POSITION.TOP_RIGHT,
           });
         setScreens({
             Login: true,
             SignUp: false,
             ForgetPassword: false
         })
     
        }
     
        else if(error === true)
        {
         toast.error(Message , {
             autoClose:2000,
             position: toast.POSITION.TOP_RIGHT
         });
        }
         }

         const handleCloseresetPassword = (error , message) => {

            if(error === false)
            {
             toast.success(message, {
                 autoClose:2000,
                 position:  toast.POSITION.TOP_RIGHT,
               });
             setScreens({
                 Login: true,
                 SignUp: false,
                 ForgetPassword: false
             })
         
            }

            else if(error === true)
            {
             toast.error(message , {
                 autoClose:2000,
                 position: toast.POSITION.TOP_RIGHT
             });
            }
         }


    return (
        <div {...props}>
        <Grid container className={classes.container}>
        <div className={classes.userFormWrap}>
            {screens.Login ?
                <Login
                    classes={classes}
                    handleForgetPassword={handleForgetPassword}
                    handleSignup={handleSignup}
                    handleCloseLogin={handleCloseLogin}
                />
                :
                null
            }

            {screens.SignUp ?
                <SignUp
                    classes={classes}
                    handleLogin={handleLogin}
                    handleCloseSignup={handleCloseSignup}
                />
                :
                null

            }

            {screens.ForgetPassword ?
                <ForgetPassword
                    classes={classes}
                    handleLogin={handleLogin}   
                    handleCloseresetPassword={handleCloseresetPassword}         
                />
                :
                null

            }
           </div>
          
        </Grid>
       <ToastContainer />
       </div>
    )


}

export default withStyleFix(withTheme((Authentication)))