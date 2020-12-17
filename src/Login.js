import React, { useState }  from 'react'
import { Link, useHistory  } from 'react-router-dom';
import './Login.css';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Grid } from '@material-ui/core';
import { useStateValue } from "./SessionState";

function Login() {
    let[username,userEmail]=useState('');
    let[password,userPassword]=useState('');
    const [userDetails, setUserDetails] = useState({
        token: undefined,
        user: undefined,
      });
    
    let signIn = e => {
        e.preventDefault();

      
    }

    
 
    return (
        <div className="login">
            
           <Link to='/'>
                <img className="loginHeaderLogo"src="/Image/logo.png" alt='#'/>   
            </Link>
            <div  className="signIn">
               <form className="loginForm">
               <h1>Sign in</h1>
               <div className="tags"> <h3>Username</h3></div>
               <Grid container direction="row" alignItems="center">
               <PermIdentityIcon className="icon"/> <input type='email' value={username} onChange={e => userEmail(e.target.value)} />
                </Grid>
               
               
               <div className="tags"><h3>Password</h3></div>
               <Grid container direction="row" alignItems="center">
               <LockIcon className="icon"/>
               <input type='password' value={password} onChange={e => userPassword(e.target.value)}  /><VisibilityIcon className="icon"/> <VisibilityOffIcon className="icon"/>
               </Grid>
               <div className="loginPageButtons">

               <button  type='submit' className="SigninButton"   onClick={signIn} >Sign in</button>
               <Link to='/register'> <button  type="primary" className="SignupButton" >Create Account</button>
               </Link>
               </div>
               </form>
               </div>
            
        </div>
    )
}

export default Login
