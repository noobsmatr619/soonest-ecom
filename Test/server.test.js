const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const root = require("path").join(__dirname, "client", "build");

app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.static(root));
app.get("/uploads/:file", (req, res) => {
  res.sendFile(__dirname + "/public/uploads/" + req.params.file);
});
app.use("/api/user", require("./../Routes/user"));
app.use("/api/admin", require("./../Routes/admin"));
app.use("/api/product", require("./../Routes/product"));
app.use("/api/blog", require("./../Routes/blog"));
app.use("/api/cart", require("./../Routes/Cart"));
app.use("/api/message", require("./../Routes/chat"));
app.use("/api/order", require("./../Routes/order"));
  io.on("connection", socket => {
    // console.log(socket.id);
    socket.on("notificaton", id => {
      // console.log(id);
      socket.broadcast.emit("notificaton", socket.id);
    });
    socket.on("disconnect", function () {
      // console.log("disconnect");
    });
  });

app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

http.listen(PORT, () => {
  console.log(`Your Server is runing on ${PORT} post `);
});
module.exports = app;