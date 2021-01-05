import React, { useContext } from "react";
import "./ParticipantMessages.css";
import { IconButton } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import { Link } from "react-router-dom";
import AppContext from "../../../../Context/AppContext";
function ParticipantMessages({ name, email, admin }) {
  const appcontext = useContext(AppContext);
  return (
    <Link
      to={
        appcontext.isAuthenticated && appcontext.user && appcontext.user.admin
          ? `/adminchat/${admin._id}`
          : `/chat/${admin._id}`
      }
    >
      <div className='participantMessages'>
        {console.log(name)}
        <div className='participantMsgPic'>
          <IconButton>
            <FaceIcon />
          </IconButton>
        </div>
        <div className='participantInfo'>
          <h2 className='participantmsgPartiName'>{name}</h2>

          <p className='participantmsgPartiLstText'>{email}</p>
        </div>
      </div>
    </Link>
  );
}

export default ParticipantMessages;
