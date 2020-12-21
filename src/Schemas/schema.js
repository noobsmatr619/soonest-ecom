let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    //userId : { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 7 },
    actualName: { type: String },
    isAdmin: { type: Boolean, default: false, required: false},
    isBuyer: { type: Boolean, default: true, required: false },
  });
  
  module.exports = User = mongoose.model("user", userSchema);
