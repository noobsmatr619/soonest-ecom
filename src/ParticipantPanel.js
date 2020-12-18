import React from 'react';
import './Participantpanel.css';
import { IconButton } from '@material-ui/core';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import HomeIcon from '@material-ui/icons/Home';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SearchIcon from '@material-ui/icons/Search';
import ParticipantMessages from './ParticipantMessages';
import{Scrollbars} from "react-custom-scrollbars"
import { Link } from 'react-router-dom'
function ParticipantPanel() {
    return (
        <div className='participantpanel'>
            

            <div className="participantHeader">
         
                <IconButton>
                <Link to='/' className="homestyle"> <HomeIcon /> </Link>
                </IconButton>

                     <div className="participantTopRight">
               <IconButton>
            
               <QuestionAnswerIcon />
               </IconButton>
               <IconButton>
               <AccessibilityNewIcon/> {/* might wanna change it to day night interchangable later*/}
               </IconButton>
                     </div>
                     
            </div>
            <div className="participantsearch">
                <div className="participantSearcholder">
               <IconButton> <SearchIcon/></IconButton>               
                <input placeholder="Search Chat" type="text"/>
                </div>
            

            </div>
            <div className="sidebarParticipants">
                    <ParticipantMessages/>
                   <ParticipantMessages/>
                    <ParticipantMessages/>
                    <ParticipantMessages/>
                    <ParticipantMessages/>
                    <ParticipantMessages/>
                    {/* <ParticipantMessages/>
                    <ParticipantMessages/>
                    <ParticipantMessages/> */}
                    
                    {/* <Scrollbars/> */}
            </div>
        </div>
    )
}

export default ParticipantPanel
