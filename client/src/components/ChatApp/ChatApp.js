import React, { useEffect, useState, useContext } from "react";
import "./ChatBox.css";
import { APIs } from "../../constraint/API";
import ChatPanel from "./Components/ChatPanel/ChatPanel";
import AppContext from "../../Context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Pusher from "pusher-js";
import { set } from "mongoose";

function ChatPage() {
  const param = useParams();

  const appcontext = useContext(AppContext);
  let [chats, setChats] = useState([]);
  const [loading, setloading] = useState(true);
  const [chat2, setchat2] = useState([]);
  useEffect(() => {
    const fun = async () => {
      setloading(true);
      await appcontext.getUserByID(param.id);
      await axios.get(`${APIs}/api/message`).then(response => {
        setChats(response.data);
        setloading(false);
      });
    };
    fun();
  }, [param.id]);
  useEffect(() => {
    if (appcontext.user) {
      var pusher = new Pusher("69bd1e9bd301bdcb9687", {
        cluster: "ap2",
      });
      let pusherListener = pusher.subscribe("messages");
      pusherListener.bind("inserted", newChats => {
        setChats([...chats, newChats]);
      });
      if (chats.length > 0) {
        let arr = chats.filter(
          c =>
            c.privateid === param.id ||
            (c.privateid === appcontext.user._id && c.client === param.id)
        );
        setchat2(arr);
        console.log(arr);
      }
      console.clear();
      // console.log(chats);
      return () => {
        pusherListener.unbind_all();
        pusherListener.unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);
  useEffect(() => {}, []);
  return <> {!loading && <ChatPanel chats={chat2} />}</>;
}

export default ChatPage;
