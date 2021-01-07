import React, { useState, useContext } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Grid } from "@material-ui/core";
import AppContext from "../../Context/AppContext";
import ErrorShow from "../Pages/ErrorShow";

function LoginAsAdmin() {
  let appcontext = useContext(AppContext);
  let location = useLocation();
  let [Form, setForm] = useState({
    email: "",
    password: "",
  });
  let [passwordShown, setPasswordShown] = useState(false);
  let togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  let [error, setError] = useState();
  let signIn = async e => {
    e.preventDefault();
    let { email, password } = Form;
    if (email === "") {
      return toast.error("Please Enter Your Email");
    } else if (password === "") {
      return toast.error("Please Enter Your Password");
    } else {
      appcontext.loginAdmin(Form);
    }
  };
  let inputHandler = e => {
    let data = { ...Form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };
  if (appcontext.isAuthenticated && appcontext.user && appcontext.user.admin) {
    return <Redirect to='/admin/addedproduct' />;
  }

  return (
    <div className='login'>
      <Link to='/'>
        <img className='loginHeaderLogo' src='/Image/logo.png' alt='#' />
      </Link>
      {error && (
        <ErrorShow message={error} clearError={() => setError(undefined)} />
      )}
      <div className='signIn'>
        <form className='loginForm' onSubmit={signIn}>
          <h1>Sign in As Admin</h1>
          <div className='tags'>
            {" "}
            <h3>Email</h3>
          </div>
          <Grid container direction='row' alignItems='center'>
            <PermIdentityIcon className='icon' />

            <input
              required={true}
              name='email'
              type='email'
              value={Form.email}
              onChange={inputHandler}
            />
          </Grid>

          <div className='tags'>
            <h3>Password</h3>
          </div>
          <Grid container direction='row' alignItems='center'>
            <LockIcon className='icon' />
            <input
              required={true}
              name='password'
              value={Form.password}
              type={passwordShown ? "text" : "password"}
              onChange={inputHandler}
            />
            <VisibilityIcon
              onClick={togglePasswordVisiblity}
              className='icon'
            />
          </Grid>
          <div className='loginPageButtons'>
            <input
              type='submit'
              className='SigninButton'
              placeholder='Sign In'
              onClick={signIn}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginAsAdmin;
