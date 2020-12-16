let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
require("dotenv").config();


let app = express();
app.use(express.json());
app.use(cors());
let PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`port: ${PORT}`));
 

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) throw err;
      console.log("success mongo! you have earned yourself some sleep");
    }
  );

  
  app.use("/users", require("./routes/Router"));