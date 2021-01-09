import React, { useEffect, useState, useContext } from "react";
import "./ChatPanel.css";
import FaceIcon from "@material-ui/icons/Face";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import AppContext from "../../../../Context/AppContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
function ChatPanel({ chats }) {
  const appcontext = useContext(AppContext);
  let params = useParams();
  console.log(params);
  let [form, setform] = useState({
    text: "",
    privateid: params.id,
  });
  let sendChat = async e => {
    e.preventDefault();
    await appcontext.sendMessage(form);
    setform({ text: "", privateid: params.id });
  };
  return (
    <div className='chatPanel'>
      <div className='topChat'>
        <FaceIcon />
        <div className='topChatDetails'>
          <h3>{appcontext.userbyid && appcontext.userbyid.email}</h3>
          {/* <p>Viewed at..</p> */}
        </div>
        <div className='topChatRight'>
          {/* <IconButton>
            {" "}
            <SearchIcon />
          </IconButton> */}
        </div>
      </div>
      <div className='mainChat'>
        {chats.map(chat => (
          <p
            className={
              chat.privateid === params.id ? "sentMessage" : "receivedMessage"
            }
          >
            <span className='participantName'>{chat.name}</span>
            {chat.message}
            <span className='messageTime'>{chat.date}</span>
          </p>
        ))}
      </div>
      <div className='bottomPanel'>
        <IconButton>
          {/* <EmojiEmotionsIcon /> */}
        </IconButton>
        <form>
          <input
            value={form.text}
            onChange={e => {
              let data = { ...form };
              data.text = e.target.value;
              setform(data);
            }}
            type='text'
          />
          <button onClick={sendChat} type='submit'>
            Send a message
          </button>
        </form>
        <IconButton onClick={sendChat}>
          <SendIcon />
        </IconButton>
        {/* <IconButton>
          <MicIcon />
        </IconButton> */}
      </div>
    </div>
  );
}

export default ChatPanel;
