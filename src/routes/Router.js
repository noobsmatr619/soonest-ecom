let router = require("express").Router();
let bcrypt = require("bcryptjs");
let User = require("../Schemas/schema");
let Permission = require("../Permit/Permission.js");
let jwt = require("jsonwebtoken");
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
      //  console.log(pastUser )
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

    router.post("/login", async (req, res) => {
        try {
          let { email, password } = req.body;
      
       
          if (!email || !password)
            return res.status(400).json({ msg: "Fill up all the fields" });
      
          let user = await User.findOne({ email: email });
          if (!user)
            return res
              .status(400)
              .json({ msg: "This email is not registered with us ." });
      
          let allow = await bcrypt.compare(password, user.password);
          if (!allow) return res.status(400).json({ msg: "User name or password incorrect " });
      
          let token = jwt.sign({ id: user._id }, process.env.jwt_secret);
          res.json({
            token,
            user: {
              id: user._id,
              actualName: user.actualName,
              // email:user.email
            },
          });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });
      router.delete("/delete", Permission, async (req, res) => {
        try {
          let deletedUser = await User.findByIdAndDelete(req.user);
          res.json(deletedUser);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }

      });
      router.post("/validatedToken", async (req, res) => {
        try {
          let token = req.header("x-auth-token");
          if (!token) return res.json(false);
      
          let validated = jwt.verify(token, process.env.jwt_secret);
          if (!validated) return res.json(false);
      
          const user = await User.findById(validated.id);
          if (!user) return res.json(false);
      
          return res.json(true);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });
      router.get("/", Permission, async (req, res) => {
        let user = await User.findById(req.user);
        
        res.json({
            actualName: user.actualName,
            id: user._id,
        });
     
      });
      router.get("/test", async (req, res) => {
        res.send("user")
       });

module.exports = router;