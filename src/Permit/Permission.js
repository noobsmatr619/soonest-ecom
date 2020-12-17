let jwt = require("jsonwebtoken");

let Permission = (req, res, next) => {
  try {
    let secret = req.header("x-auth-token");
    if (!secret)
      return res
        .status(401)
        .json({ msg: "Can't perform task, due to token validation error." });

    let  permitted= jwt.verify(secret, process.env.jwt_secret);
    if (!permitted)
      return res
        .status(401)
        .json({ msg: "Can't perform task, due to token validation error." });
console.log(permitted)
    req.user = permitted.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = Permission;