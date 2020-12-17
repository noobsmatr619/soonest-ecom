import React, { useState }  from 'react'
import { Link } from 'react-router-dom';
import './Register.css';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Grid } from '@material-ui/core';
import { useStateValue } from "./SessionState";
function Register() {
    return (
        <div className="register">
              
           <Link to='/'>
                <img className="loginHeaderLogo"src="/Image/logo.png" alt='#'/>   
            </Link>
        <div className="signUp">
             
        <form className="loginForm">
        <h1>Sign Up</h1>
        <div className="tags"> <h3>Your Name</h3></div>
        <Grid container direction="row" alignItems="center">
        <PermIdentityIcon  className="icon"/>
        <input type='text' />
        </Grid>
        <div className="tags"> <h3>Username</h3></div>
        <Grid container direction="row" alignItems="center">
        <PermIdentityIcon  className="icon"/>
        <input type='email' /></Grid>
        <div className="tags"><h3>Password</h3></div>
        <Grid container direction="row" alignItems="center">
        <LockIcon  className="icon"/>
        <input type='password' /><VisibilityIcon  className="icon"/> <VisibilityOffIcon className="icon"/></Grid>
        <div className="tags"><h3>Confirm Password</h3></div>
        <Grid container direction="row" alignItems="center">
        <LockIcon  className="icon" />
        <input type='password' /><VisibilityIcon  className="icon"/> <VisibilityOffIcon  className="icon" /></Grid>
        <div className="loginPageButtons">
        <Link to="/login"> <button   type="primary" className="SigninButton"   >Log in into existing account</button></Link>
       <button type='submit' className="SignupButton"   >Sign up</button> 
        </div>
        </form>

     </div></div>
    )
}

export default Register
