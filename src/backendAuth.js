let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
require("dotenv").config();


let app = express();
app.use(express.json());
app.use(cors());
let PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`port: ${PORT}`));
//mongodb+srv://admin:<password>@cluster0.tpz9g.mongodb.net/<dbname>?retryWrites=true&w=majority