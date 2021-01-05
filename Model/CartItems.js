const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  details: {
    _id: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: { type: Number, required: true },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = CartItem = mongoose.model("cartItem", CartItemSchema);
