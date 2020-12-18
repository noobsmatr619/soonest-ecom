import React,{ useContext }  from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "./context/UserContext";

// userDetails, setUserDetails de structure

export default function AuthOptions() {
let {userDetails, setUserDetails}= useContext(UserContext);
let history = useHistory();
let register = () => history.push("/register");
let login = () => history.push("/login");
  let logout = () => {
    setUserDetails({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  return (
    <nav className="auth-options">
      {userDetails.user ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
        </>
      )}
    </nav>
  );

};



