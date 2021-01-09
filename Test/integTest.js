const express = require("express");
const app = express();
const connectDB = require("../config/db");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

const mongoose = require("mongoose");

chai.use(chaiHttp);

suite("Integration Tests", function () {
    suiteSetup(() => {

        mongoose.set("debug", false);
    });

    test("Test GET /", async function () {
        connectDB();

        chai
            .request(app)
            .get("/")
            .end(function (error, response) {
                chai.assert.equal(response.status, 200, "Wrong status code");

            });
    });


    suiteTeardown((done) => {

        mongoose.disconnect(() => {
            mongoose.connection.close(done);
            //server.app.close();
        });
    });

});