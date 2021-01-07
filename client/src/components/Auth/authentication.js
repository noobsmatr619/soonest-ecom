import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
// userDetails, setUserDetails de structure
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./authentication.css";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AppContext from "../../Context/AppContext";
export default function AuthOptions() {
  let appcontext = useContext(AppContext);

  let [open, setOpen] = useState(false);
  let authDropdown = () => {
    console.log("hi");
    setOpen(!open);
  };

  return (
    <nav className='auth-options'>
      {appcontext.isAuthenticated ? (
        <div>
          {" "}
          <AccountCircleIcon
            className='headerRightOptionAut'
            onClick={authDropdown}
          />
          <nav className={open ? "dropdown" : "dropdown showing"}>
            <ul className='menu-item'>
              <li>
                {" "}
                <Link to='/edituser' className='accountShow'>
                  {" "}
                  <AccountBoxIcon />
                  Account
                </Link>{" "}
              </li>
              <li>
                {" "}
                <Link to='/' className='logOutShow' onClick={appcontext.logOut}>
                  {" "}
                  <li>
                    <MeetingRoomIcon />
                    log Out
                  </li>
                </Link>{" "}
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <>
          <Link to='/login'>
            <span className='headerRightOptionAut'>
              <AccountCircleIcon />
            </span>
          </Link>
        </>
      )}
    </nav>
  );
}
