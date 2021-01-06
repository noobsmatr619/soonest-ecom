let mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 7 },
  actualName: { type: String },
  cart: { type: Array },
  admin: {
    type: Boolean,
    default: false,
  },
  wishlist: { type: Array, default: [] },
  orderhistory: { type: Array, default: [] },
  resettoken: { type: String },
  expiretoken: { type: Date },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
