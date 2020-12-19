import React, { useState, useContext }     from 'react'
import { Link, useHistory  } from 'react-router-dom';
import './Login.css';
import Axios from "axios";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Grid } from '@material-ui/core';
import UserContext from './context/UserContext';

function Login() {
    let [email, setEmail] = useState();
    let [password, setPassword] = useState();
   // let [error, setError] = useState();
   // let[username,userEmail]=useState('');
    //let[password,userPassword]=useState('');
    let { setUserData } = useContext(UserContext);
    let history = useHistory();
    let [passwordShown, setPasswordShown] = useState(false);
    let togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };
    let signIn = async (e) => {
        e.preventDefault();
        try {
          let loginUser = { email, password };
          let loginRes = await Axios.post("http://localhost:9000/users/login",loginUser);
          //console.log("i was here")
          setUserData({
            secretCode: loginRes.data.secretCode,
            user: loginRes.data.user,
          });
          console.log(loginRes.data.secretCode)
          console.log(loginRes.data.user)
          localStorage.setItem("auth-token", loginRes.data.secretCode);
          history.push("/");
        } catch (err) {
            console.log(err)
        //  err.response.data.msg && setError(err.response.data.msg);
        }
      };

    
 
    return (
        <div className="login">
            
           <Link to='/'>
                <img className="loginHeaderLogo"src="/Image/logo.png" alt='#'/>   
            </Link>
            <div  className="signIn">
               <form className="loginForm" onSubmit={signIn } >
               <h1>Sign in</h1>
               <div className="tags"> <h3>Email</h3></div>
               <Grid container direction="row" alignItems="center">
               <PermIdentityIcon className="icon"/> 
               <input type='email'  onChange={e => setEmail(e.target.value)} />
                </Grid>
               
               
               <div className="tags"><h3>Password</h3></div>
               <Grid container direction="row" alignItems="center">
               <LockIcon className="icon"/>
               <input type={passwordShown ? "text" : "password"}onChange={e =>  setPassword(e.target.value)}  /><VisibilityIcon onClick={togglePasswordVisiblity} className="icon"/> 
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
