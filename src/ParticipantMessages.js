import React from 'react'
import "./ParticipantMessages.css"
import ImageIcon from '@material-ui/icons/Image';
import { IconButton } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
function ParticipantMessages() {
    return (
        <div className="participantMessages">
            <div className="participantMsgPic">
            <IconButton>
            <FaceIcon/>
            </IconButton>
            </div>
            <div className="participantInfo">
           <h2 className="participantmsgPartiName">Participant</h2>
        
            <p className="participantmsgPartiLstText">User text</p>
            </div>
        
            
        </div>
    )
}

export default ParticipantMessages
