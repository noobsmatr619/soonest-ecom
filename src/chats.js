// import mongoose from 'mongoose'
let mongoose = require("mongoose");

let chatSchema=mongoose.Schema({
   // id:String,
    chat:String,
    name:String,
    dateTime:String,
    received:Boolean,
        
});

let collectionName='chatscollections'
//export default mongoose.model(collectionName,chatSchema);

module.exports = chats = mongoose.model(collectionName,chatSchema);





