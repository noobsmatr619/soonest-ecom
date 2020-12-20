import React, { useState, useContext }  from 'react'
import { Link, useHistory  } from 'react-router-dom';
import './Register.css';
import Axios from "axios";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Grid } from '@material-ui/core';
import { useStateValue } from "./SessionState";
import UserContext from './context/UserContext';
function Register() {
    let history = useHistory();
    let [email, setEmail] = useState();
    let [password, setPassword] = useState();
    let [confirmPassword, setconfirmPassword] = useState();
    let [actualName, setactualName] = useState(); 
    let [passwordShown, setPasswordShown] = useState(false);
    let togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };
    //let [checkPasswordShown, chekcSetPasswordShown] = useState(false);
  
    let  {setUserDetails}  = useContext(UserContext);
    // const [userDetails, setUserDetails] = useState({      
    //   });
      let registerUser = async (e)  => {
        e.preventDefault();
       
        try {
            console.log("started");
            let newUser = { email, password, confirmPassword, actualName };
            
            await Axios.post("http://localhost:9000/users/register", newUser);
            
            let loginRes = await Axios.post("http://localhost:9000/users/login", {
              email,
              password,
            });

            // let [userDetails, setUserDetails] = useState({
            //     secretCode: undefined,
            //     user: undefined,
            //   });

           
            setUserDetails({
                
              secretCode: loginRes.data.token,
              user: loginRes.data.user,
             });
            console.log("i am herer")
            localStorage.setItem("auth-token", loginRes.data.token);
            
            history.push("/");
          } catch (err) {
            console.log(err);
          }
    };
    return (
        <div className="register">
              
           <Link to='/'>
                <img className="loginHeaderLogo"src="/Image/logo.png" alt='#'/>   
            </Link>
        <div className="signUp">
     
        <form className="loginForm" onSubmit={registerUser}>
        <h1>Sign Up</h1>
        <div className="tags"> <h3>Your Name</h3></div>
        <Grid container direction="row" alignItems="center">
        <PermIdentityIcon  className="icon"/>
        <input type='text' onChange={(e) => setactualName(e.target.value)} />
        </Grid>
        <div className="tags"> <h3>Email</h3></div>
        <Grid container direction="row" alignItems="center">
        <PermIdentityIcon  className="icon"/>
        <input type='email'  onChange={(e) => setEmail(e.target.value)} /></Grid>
        <div className="tags"><h3>Password</h3></div>
        <Grid container direction="row" alignItems="center">
        <LockIcon  className="icon"/>
        <input onChange={(e) => setPassword(e.target.value)} type={passwordShown ? "text" : "password"}/><VisibilityIcon  className="icon" onClick={togglePasswordVisiblity} /> </Grid>
        <div className="tags"><h3>Confirm Password</h3></div>
        <Grid container direction="row" alignItems="center">
        <LockIcon  className="icon" />
      
        <input type='password' onChange={(e) => setconfirmPassword(e.target.value)} type={passwordShown ? "text" : "password"}/></Grid>
        <div className="loginPageButtons">
        <Link to="/login"> <button   type="primary" className="SigninButton"   >Log in into existing account</button></Link>
       <button type='submit' className="SignupButton"   >Sign up</button> 
        </div>
        </form>

     </div></div>
    )
}

export default Register
