import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { toast } from "react-toastify";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { Grid } from "@material-ui/core";
import AppContext from "../../Context/AppContext";
import ErrorShow from "../Pages/ErrorShow";

function EditUserDetails() {
  let appcontext = useContext(AppContext);
  let [Form, setForm] = useState({
    actualName: "",
    email: "",
  });
  useEffect(() => {
    if (appcontext.isAuthenticated) {
      let data = { ...Form };
      data.actualName = appcontext.user.actualName;
      data.email = appcontext.user.email;
      console.log(data);
      debugger;
      setForm(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appcontext.isAuthenticated]);
  let [error, setError] = useState();

  let registerUser = async e => {
    e.preventDefault();
    let { actualName, email } = Form;
    if (actualName === "") {
      return toast.error("Please Enter Your Name");
    } else if (email === "") {
      return toast.error("Please Enter Your Email Address");
    } else {
      appcontext.updateUser(Form);
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
          <h2>Account Info</h2>
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
          <div className='loginPageButtons'>
            <button type='submit' className='SignupButton'>
              Update Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserDetails;
