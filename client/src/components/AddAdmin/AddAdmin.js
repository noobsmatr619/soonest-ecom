import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-toastify";
const AddAdmin = () => {
  const appcontext = useContext(AppContext);
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const inputHandler = e => {
    let data = { ...form };
    data[e.target.name] = e.target.value;
    setform(data);
  };
  const onSubmit = e => {

    e.preventDefault();
    let { email, password } = form;
    if (email === "") {
      return toast.error("Please Enter Your Email");
    } else if (password === "") {
      return toast.error("Please Enter Your Password");
    }
    else { appcontext.addAdmin(form); }

  };
  return (
    <div className='container'>
      <h3>Add Admin</h3>
      <Form onSubmit={onSubmit}>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
          <Label for='exampleEmail' className='mr-sm-2'>
            Email
          </Label>
          <Input
            type='email'
            name='email'
            id='exampleEmail'
            onChange={inputHandler}
            placeholder='Email'
          />
        </FormGroup>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
          <Label for='examplePassword' className='mr-sm-2'>
            Password
          </Label>
          <Input
            type='password'
            name='password'
            onChange={inputHandler}
            id='examplePassword'
            placeholder="password"
          />
        </FormGroup>
        <p>Password must contain <br /> atleast 1 of each- Capital, small letter, numeric and any of the <br /> following symbols
          "@$!%*#?&" </p>
        {"   "}
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default AddAdmin;
