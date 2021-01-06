import React, { useState, useContext } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { Grid } from "@material-ui/core";
import AppContext from "../../Context/AppContext";

function ResetPassword() {
  let appcontext = useContext(AppContext);
  let [Form, setForm] = useState({
    email: "",
  });
  let resetpassword = async e => {
    e.preventDefault();
    let { email } = Form;
    if (email === "") {
      return toast.error("Please Enter Your Email");
    } else {
      appcontext.resetPassword(Form);
    }
  };
  let inputHandler = e => {
    let data = { ...Form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };
  return (
    <div className='login'>
      <div className='signIn'>
        <form className='loginForm' onSubmit={resetpassword}>
          <h1>Reset Password</h1>
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
          <div className='loginPageButtons'>
            <input
              type='submit'
              className='SigninButton'
              placeholder='Reset Password'
              onClick={resetpassword}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
