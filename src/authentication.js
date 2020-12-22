import React,{ useContext, useState }  from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "./context/UserContext";
import { Link } from 'react-router-dom';
// userDetails, setUserDetails de structure
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './authentication.css'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
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
  let [open , setOpen]= useState(false);
  let authDropdown = () => {console.log("hi"); setOpen(!open)};
  
     
  return (
    <nav className="auth-options">
      {userDetails.user ? (
       <div > <AccountCircleIcon className="headerRightOptionAut" onClick={authDropdown}/> 
       <nav className={open  ? 'dropdown' : 'dropdown showing'}>
        <ul className="menu-item">
          
        
        <li >  <Link to="/account" className="accountShow"  > < AccountBoxIcon/>Account</Link>  </li>
       <li >  <Link to="/" className="logOutShow" onClick={logout}> <li><MeetingRoomIcon/>log Out</li></Link>  </li>
        
       </ul>
       </nav>
       </div>
        
      ) : (
        <>
          <Link to="/login">
                <span className="headerRightOptionAut"><AccountCircleIcon/></span>
                </Link> 
        </>
      )}
    </nav>
  );

};



