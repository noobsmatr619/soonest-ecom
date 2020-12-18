import React,{useEffect,useState}  from 'react'
import './ChatPanel.css'
import FaceIcon from '@material-ui/icons/Face';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import axios from './axios'
import { Link } from 'react-router-dom'
function ChatPanel({chats}) {
    let [inputState, setInputState] = useState("");
    let sendChat = async (e) =>{
        e.preventDefault();
      await axios.post('/chats/new',{
            "chat":inputState,
            "name":inputState.name,
            "dateTime":inputState.dateTime,
            "received": true,
        });
        setInputState("")
    };
    return (
        <div className='chatPanel'>
            <div className="topChat">
               <FaceIcon/>
                <div className="topChatDetails">
                    <h3>Partipant</h3>
                    <p>Viewed at..</p>
                </div>
                <div className="topChatRight">
                <IconButton> <SearchIcon/></IconButton>   
                </div>
            </div>
            <div className="mainChat">
                {chats.map(chat=>(
                    <p className={`receivedMessage ${chat.received && "sentMessage"}`}>
                    <span className="participantName">{chat.name}</span>
 
                       {chat.chat}
                        <span className="messageTime">
                       {chat.dateTime}
                         </span>
 
                    </p> 

                ))}
              
              

            </div>
            <div className="bottomPanel">
                <IconButton>
                <EmojiEmotionsIcon/>
                </IconButton>
                <form >
                    <input value={inputState} onChange={e=>setInputState(e.target.value)} type="text"/>
                    <button  onClick={sendChat} type="submit" >Send a message</button>
                  
                </form>
                <IconButton onClick={sendChat} >
                    <SendIcon/>
                    </IconButton>
                    <IconButton>
                    <MicIcon/>
                    </IconButton>
            </div>
        </div>
    )
}

export default ChatPanel
