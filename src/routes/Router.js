let router = require("express").Router();
let bcrypt = require("bcryptjs");
let User = require("../Schemas/schema");
router.post("/register", async (req, res) => {

    //res.send("u can smoke now, it worked");

    try {
        let { email, password, confirmPassword, actualName } = req.body;
    
 
    
        if (!email || !password || ! confirmPassword)
          return res.status(400).json({ msg: "Please make sure all the fields are filled" });
        if (password.length < 7)
          return res
            .status(400)
            .json({ msg: "7 character except symbols are required " });
        if (password !== confirmPassword)
          return res
            .status(400)
            .json({ msg: "Please retype Confirm password and make sure it is same as password above" });
    
        let pastUser = await User.findOne({ email: email });
        console.log(pastUser )
        if (pastUser)
          return res
            .status(400)
            .json({ msg: "This account already exists with us " });
    
        if (!actualName ) actualName  = email;
        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
    
        let newUser = new User({
        
          email,
          password: hashedPassword,
          actualName,
        });
        let savedUser = await newUser.save();
        res.json(savedUser);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });


module.exports = router;