const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json({ extended: true }));
app.get("/uploads/:file", (req, res) => {
  res.sendFile(__dirname + "/public/uploads/" + req.params.file);
});
app.use("/api/user", require("./Routes/user"));
app.use("/api/admin", require("./Routes/admin"));
app.use("/api/product", require("./Routes/product"));
app.use("/api/blog", require("./Routes/blog"));
app.use("/api/cart", require("./Routes/Cart"));
app.use("/api/message", require("./Routes/chat"));
app.use("/api/order", require("./Routes/order"));

app.listen(PORT, () => {
  console.log(`Your Server is runing on ${PORT} post `);
});
module.exports = app;