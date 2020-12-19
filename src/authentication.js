import React,{ useContext,useState }  from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "./context/UserContext";
import { Link } from 'react-router-dom';
// userDetails, setUserDetails de structure
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
export default function AuthOptions() {
let { userDetails, setUserDetails }= useContext(UserContext);
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
         <Link to="/account">
         <span className="headerRightOption"><AccountCircleIcon/></span>
         </Link> 
      ) : (
        <>
          <Link to="/login">
                <span className="headerRightOption"><AccountCircleIcon/></span>
                </Link> 
        </>
      )}
    </nav>
  );

};



