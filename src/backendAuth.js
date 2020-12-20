//import chats from './chats.js';
const Pusher = require("pusher");
let chats = require('./chats.js');
let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
// import dotenv from 'dotenv'
// //import { createRequire } from 'module';
// import  {users} from "./routes/Router.js"
// dotenv.config()
//let require = createRequire(import.meta.url);
require("dotenv").config();
//config 
let app =express();
let port=process.env.port||9000;
let pusher = new Pusher({
    appId: "1125297",
    key: "dd8310c7b114614bc9d7",
    secret: "748439cd9dcc68ef91ee",
    cluster: "eu",
    useTLS: true
  });
//middleware
app.use(express.json());
app.use(cors());
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Headers","*");
//     next();
    
//     //unsecured way of setting headers, if cors fails due to cross platform integration 
// })
//db config
let dbUrl=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tpz9g.mongodb.net/<dbname>`; // password and username hidden in .env 
//console.log(dbUrl)
mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex:true},
    (err)=> {
        if (err) throw err;
        console.log("connection established");
      });
mongoose.connection.on('connected',()=>{

    console.log("mongoose connected ")
  
  });
  let db=mongoose.connection
  db.once('open',()=>{
    console.log("database connected within pusher connection");
    let chatColl=db.collection('chatscollections')
   //console.log(chatColl)
    let chatChange=chatColl.watch()
    chatChange.on('change',(change)=>{
        console.log(change)
      if(change.operationType==='insert'){
        let chatDetails=change.fullDocument;
        pusher.trigger('chats','inserted',{
           // id:chatDetails.id,
                name: chatDetails.name,
                chat:chatDetails.chat,
                dateTime:chatDetails.dateTime,
                received:chatDetails.received,
        })

      } else{
          console.log("i messed up")
      }
    })
  })
//api

app.get("/",(req,res)=>res.status(200).send('Hello, Nothing to see here :P,Type in http://localhost:3000/ to get to the App'))  ;

app.get("/chats/sync",(req,res)=>{
    // eslint-disable-next-line array-callback-return
    chats.find((err,data)=>{
        if(err){
            // eslint-disable-next-line no-undef
            res.status(500).send(error)
        }
        else{
            res.status(200).send(data)
       }
        });
    
        });
app.post("/chats/new", (req,res)=>{
    let dbChats=req.body 
chats.create(dbChats,(error,data)=>{

 if(error){
        res.status(500).send(error)
    }
    else{res.status(201).send(data)}

})
   
})


//listen
app.listen(port,()=>console.log(` listening on localhost:${port}`));

app.use("/users", require("./routes/Router"));

app.use("/blogs", require("./routes/BlogRoute"))
