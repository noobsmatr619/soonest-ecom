const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../Model/User");

const auth = require("../middleware/auth");
const router = express.Router();
//LOAD USER
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
});
router.get("/all", auth, async (req, res) => {
  try {
    const user = await User.find({ admin: false }).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
});
router.get("/get/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
});

//SIGN UP
router.post("/signup", async (req, res) => {
  console.log(req.body);
  let { email, password, actualName } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "This account already exists with us " });
    }
    // Registring USers

    user = new User({
      email,
      password,
      actualName,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // saving user in database
    await user.save();
    // return jwt token
    payload = {
      user: {
        id: user.id,
        admin: false,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtsecret"),
      {
        expiresIn: "364d",
      },
      (error, token) => {
        if (error) throw error;
        res.json({
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});
//LOGIN
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Full up all the fields" });
  let user;
  try {
    user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "This email is not registered with us ." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "User name or password incorrect " });
    }
    payload = {
      user: {
        id: user.id,
        admin: false,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtsecret"),
      {
        expiresIn: "364d",
      },
      (error, token) => {
        if (error) throw error;
        res.json({
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// DELETE
router.delete("/delete", auth, async (req, res) => {
  try {
    let deletedUser = await User.findByIdAndDelete(req.user.id);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
