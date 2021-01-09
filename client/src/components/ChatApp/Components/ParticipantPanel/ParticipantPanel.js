import React, { useContext, useEffect } from "react";
import "./Participantpanel.css";
import { IconButton } from "@material-ui/core";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import HomeIcon from "@material-ui/icons/Home";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import SearchIcon from "@material-ui/icons/Search";
import ParticipantMessages from "../ParticipantMessage/ParticipantMessages";
import { Scrollbars } from "react-custom-scrollbars";
import AppContext from "../../../../Context/AppContext";
import { Link } from "react-router-dom";
function ParticipantPanel() {
  const appcontext = useContext(AppContext);
  useEffect(() => {
    appcontext.getAdmin();
    appcontext.getAllUser();
  }, []);
  return (
    <div className='participantpanel'>
      <div className='participantHeader'>
        <IconButton>
          <Link to='/' className='homestyle'>
            {" "}
            <HomeIcon />{" "}
          </Link>
        </IconButton>

        <div className='participantTopRight'>
          {/* <IconButton>
            <QuestionAnswerIcon />
          </IconButton> */}
          <IconButton>
            {/* <AccessibilityNewIcon />{" "} */}
            {/* might wanna change it to day night interchangable later*/}
          </IconButton>
        </div>
      </div>
      {/* <div className='participantsearch'>
        <div className='participantSearcholder'>
          <IconButton>
            {" "}
            <SearchIcon />
          </IconButton>
          <input placeholder='Search Chat' type='text' />
        </div>
      </div> */}
      <div className='sidebarParticipants'>
        {appcontext.user && appcontext.user.admin ? (
          <>
            {appcontext.users &&
              appcontext.users.map(a => (
                <>
                  <ParticipantMessages
                    admin={a}
                    name={a.actualName}
                    email={a.email}
                  />
                </>
              ))}
          </>
        ) : (
            <>
              {appcontext.admin &&
                appcontext.admin.map(a => (
                  <>
                    {console.log(a)}
                    <ParticipantMessages
                      admin={a}
                      name={a.actualName}
                      email={a.email}
                    />
                  </>
                ))}
            </>
          )}

        {/* <Scrollbars/> */}
      </div>
    </div>
  );
}

export default ParticipantPanel;
