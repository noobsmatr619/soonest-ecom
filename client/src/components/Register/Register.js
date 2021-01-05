import React, { useState, useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import "./Register.css";
import { toast } from "react-toastify";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import { Grid } from "@material-ui/core";
import AppContext from "../../Context/AppContext";
import ErrorShow from "../Pages/ErrorShow";

function Register() {
  let appcontext = useContext(AppContext);
  let history = useHistory();
  let [Form, setForm] = useState({
    actualName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let [passwordShown, setPasswordShown] = useState(false);
  let togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  let [error, setError] = useState();
  let [checkPasswordShown, chekcSetPasswordShown] = useState(false);

  if (appcontext.isAuthenticated) {
    return <Redirect to='/' />;
  }
  let registerUser = async e => {
    e.preventDefault();

    let { actualName, email, password, confirmPassword } = Form;
    let reg = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@$!%*#?&]).{7,}$"
    );
    let isOk = reg.test(password);
    if (actualName === "") {
      return toast.error("Please Enter Your Name");
    } else if (email === "") {
      return toast.error("Please Enter Your Email Address");
    } else if (!isOk) {
      return toast.error("Password is not Secure");
    } else if (password === "") {
      return toast.error("Please Enter Your Password ");
    } else if (confirmPassword === "") {
      return toast.error("Please Enter Your Confirm Password");
    } else if (password !== confirmPassword) {
      return toast.error("Password Doesn't Match");
    } else {
      appcontext.registerUser(Form);
    }
  };

  let inputHandler = e => {
    let data = { ...Form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };
  return (
    <div className='register'>
      <Link to='/'>
        <img className='loginHeaderLogo' src='/Image/logo.png' alt='#' />
      </Link>
      {error && (
        <ErrorShow message={error} clearError={() => setError(undefined)} />
      )}
      <div className='signUp'>
        <form className='loginForm' onSubmit={registerUser}>
          <h1>Sign Up</h1>
          <div className='tags'>
            {" "}
            <h3>Your Name</h3>
          </div>
          <Grid container direction='row' alignItems='center'>
            <PermIdentityIcon className='icon' />
            <input
              name='actualName'
              value={Form.actualName}
              type='text'
              onChange={inputHandler}
            />
          </Grid>
          <div className='tags'>
            {" "}
            <h3>Email</h3>
          </div>
          <Grid container direction='row' alignItems='center'>
            <PermIdentityIcon className='icon' />
            <input
              name='email'
              value={Form.email}
              type='email'
              onChange={inputHandler}
            />
          </Grid>
          <div className='tags'>
            <h3>Password</h3>
          </div>
          <Grid container direction='row' alignItems='center'>
            <LockIcon className='icon' />
            <input
              name='password'
              value={Form.password}
              minLength={7}
              onChange={inputHandler}
              type={passwordShown ? "text" : "password"}
            />
            <VisibilityIcon
              className='icon'
              onClick={togglePasswordVisiblity}
            />{" "}
          </Grid>
          <div className='tags'>
            <h3>Confirm Password</h3>
          </div>
          <Grid container direction='row' alignItems='center'>
            <LockIcon className='icon' />

            <input
              name='confirmPassword'
              value={Form.confirmPassword}
              onChange={inputHandler}
              type={passwordShown ? "text" : "password"}
            />
          </Grid>
          <div className='loginPageButtons'>
            <Link to='/login'>
              {" "}
              <button type='primary' className='SigninButton'>
                Log in into existing account
              </button>
            </Link>
            <button type='submit' className='SignupButton'>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
