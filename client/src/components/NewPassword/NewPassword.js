import React, { useState, useContext } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { Grid } from "@material-ui/core";
import AppContext from "../../Context/AppContext";
import { useParams } from "react-router-dom";

function NewPassword() {
  const params = useParams();
  let appcontext = useContext(AppContext);
  let [Form, setForm] = useState({
    password: "",
    confirmpassword: "",
  });
  let resetpassword = async e => {
    e.preventDefault();
    let { password, confirmpassword } = Form;
    let reg = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@$!%*#?&]).{7,}$"
    );
    let isOk = reg.test(password);
    if (!isOk) {
      return toast.error("Password is not Secure");
    } else if (password === "") {
      return toast.error("Please Enter Your Password ");
    } else if (confirmpassword === "") {
      return toast.error("Please Enter Your Confirm Password");
    } else if (password !== confirmpassword) {
      return toast.error("Password Doesn't Match");
    } else {
      appcontext.changePassword(Form, params.token);
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
            <h3>Password</h3>
          </div>
          <Grid container direction='row' alignItems='center'>
            <PermIdentityIcon className='icon' />

            <input
              required={true}
              name='password'
              type='password'
              value={Form.password}
              onChange={inputHandler}
            />
          </Grid>
          <div className='tags'>
            {" "}
            <h3>Confirm Password</h3>
          </div>
          <Grid container direction='row' alignItems='center'>
            <PermIdentityIcon className='icon' />

            <input
              required={true}
              name='confirmpassword'
              type='password'
              value={Form.confirmpassword}
              onChange={inputHandler}
            />
          </Grid>
          <p>Password must contain <br /> atleast 1 of each- Capital, small letter, numeric and any of the <br /> following symbols
          "@$!%*#?&" </p>
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

export default NewPassword;
