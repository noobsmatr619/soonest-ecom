import React,{useEffect,useState} from 'react'
import './ChatBox.css';
import ChatPanel from './ChatPanel';
import ParticipantPanel from './ParticipantPanel';
import axios from "./axios"
import Pusher from 'pusher-js'
//import { response } from 'express';
//import { response } from 'express';

function ChatPage() {

  let [chats,setChats]=useState([]);
  useEffect(()=>{
     axios.get("/chats/sync").then((response)=>{
       setChats(response.data);
     })
  },[])
  useEffect(() => {
    let pusher = new Pusher('dd8310c7b114614bc9d7', {
      cluster: 'eu'
    });
    let pusherListener = pusher.subscribe('chats');
    pusherListener.bind('inserted', (newChats)=> {
    //  alert(JSON.stringify(newChats));
      setChats([...chats,newChats]);
    });
    return ()=>{
      pusherListener.unbind_all();
      pusherListener.unsubscribe();
    };
  }, [chats]);
// console.log(chats);
  return (
    <div className="ChatApp">
     
    <div className="ChatAppMainframe">
    
       <ParticipantPanel/>
       <ChatPanel chats={chats}/>
      

    </div>

     
    </div>
  );
}

export default ChatPage;
