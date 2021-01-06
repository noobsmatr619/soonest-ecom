const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../Model/User");

const auth = require("../middleware/auth");
const router = express.Router();

//SIGN UP
router.post("/add", auth, async (req, res) => {
  let user;
  try {
    user = await User.findById(req.user.id);
    user.cart = req.body;
    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});
router.post("/wishlist/add", auth, async (req, res) => {
  let user;
  try {
    user = await User.findById(req.user.id);
    user.wishlist = req.body;
    await user.save();
    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});
router.post("/auth", auth, async (req, res) => {
  let user;
  try {
    user = await User.findById(req.user.id);
    let enterCart = user.cart;
    if (user.cart.length > 0) {
      debugger;
      if (req.body.length > 0) {
        req.body.map(c => {
          let check = false;
          user.cart.map(cart => {
            if (c._id.toString() === cart._id.toString()) {
              check = true;
              return "";
            }
          });
          if (!check) {
            enterCart.push(c);
          }
        });
        user.cart = enterCart;
        await user.save();
        res.status(200).json(user.cart);
      } else {
        res.status(200).json(user.cart);
      }
    } else {
      if (req.body.length > 0) {
        user.cart = req.body;
        await user.save();
        res.status(200).json(user.cart);
      } else {
        res.status(200).json(user.cart);
      }
    }
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

module.exports = router;
