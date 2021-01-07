const express = require("express");
const User = require("../Model/User");
const Order = require("../Model/Order");
const auth = require("../middleware/auth");
const moment = require("moment");
const router = express.Router();

//setting orders
router.get("/", auth, async (req, res) => {
  try {
    let order = await Order.find({});
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
});
router.post("/", auth, async (req, res) => {
  let user1;
  try {
    user1 = await User.findById(req.user.id);
    let history = [];
    let transactionData = {};
    console.log("run");
    //1.Put brief Payment Information inside User Collection
    req.body.cartDetail.forEach(item => {
      history.push({
        dateOfPurchase: moment(Date.now()),
        name: item.name,
        id: item._id,
        rate: false,
        image: item.image,
        star: item.star,
        price: item.price,
        quantity: item.quantity,
        paymentId: req.body.paymentData.paymentID,
      });
    });

    //2.Put Payment Information that come from Paypal into Payment Collection
    transactionData.user = {
      id: req.user.id,
      name: user1.actualName,
      email: user1.email,
    };
    transactionData.data = req.body.paymentData;
    transactionData.product = history;
    User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { orderhistory: history }, $set: { cart: [] } },
      { new: true },
      (err, user) => {
        if (err) return res.json({ success: false, err });
        const order = new Order(transactionData);
        order.save((err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json({
            success: true,
          });
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
