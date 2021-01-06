const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: Array,
    default: [],
  },
  data: {
    type: Array,
    default: [],
  },
  product: {
    type: Array,
    default: [],
  },
  Date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
