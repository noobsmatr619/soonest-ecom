import React, { useState }  from 'react'
import { Link } from 'react-router-dom';
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
    // let [show , setShow] = useState(false);

    // let  handleClick  = () => setShow(!show);
    const signIn = e => {
        e.preventDefault();

      
    }

    
    const register = e => {
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

               <button  type='submit'className="SigninButton"   onClick={signIn} >Sign in</button>
               <button  type="primary" className="SignupButton" >Create Account</button>
               
               </div>
               </form>
               </div>
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
               <button   type="primary" className="SigninButton"   >Log in into existing account</button>
               <button type='submit'className="SignupButton"  onClick={register}  >Sign up</button>
               </div>
               </form>

            </div>
        </div>
    )
}

export default Login
