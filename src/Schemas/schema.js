let mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    //userId : { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 7 },
    actualName: { type: String },
  });
  
  module.exports = User = mongoose.model("user", userSchema);
