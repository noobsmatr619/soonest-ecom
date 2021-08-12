// const express = require("express");
// const app = express();
// const connectDB = require("../config/db");
// let chai = require("chai");
// let chaiHttp = require("chai-http");
// let server = require("../server");

// const mongoose = require("mongoose");

// chai.use(chaiHttp);

// suite("Server Integration Test", function () {
//     suiteSetup(() => {
//         mongoose.set("debug", false);
//     });



//     suiteTeardown((done) => {

//         mongoose.disconnect(() => {
//             mongoose.connection.close(done)
//             done();
//             //server.app.close();
//         });
//     });

// });
let mongoose = require("mongoose");
let chai = require("chai");

const config = require("config");
const db = config.get("MongoURL");
suite("Server Integration Test", function () {

    suiteSetup(function () {
        mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("DB ReadyState: " + mongoose.connection.readyState);
    });


    suiteTeardown(function (done) {
        mongoose.connection.close();
        done();
    });


});

//cheack
