const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
const { Mongoose } = require("mongoose");
let server = require("../server");
let testData = require('./test-data');
let productId = "";
let blogId = "";
chai.should();

chai.use(chaiHttp);

describe('Task', () => {

    describe('create user', () => {
        it('it should create a new user', (done) => {
            chai.request(server)
                .post('/api/user/signup')
                .set('Content-Type', 'application/json')
                .send(testData.createNewUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })

        }).timeout(10000);

    });
    describe('login the existing user', () => {
        it('it should login the  user', (done) => {
            chai.request(server)
                .post('/api/user/login')
                .set('Content-Type', 'application/json')
                .send(testData.createNewUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })

        }).timeout(10000);

    });
    describe('delete the existing user', () => {
        it('it should delete the  user', (done) => {
            chai.request(server)
                .delete('/api/user/deleteTest')
                .set('Content-Type', 'application/json')
                .set('x-auth-token', testData.Token)
                .send({
                    // "id": "5ff49215073e021e54403cc9",
                    "actualName": "testssz"
                    // "password": "Test1234!",
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })

        }).timeout(10000);

    });

    describe('Add an admin', () => {
        it('it should add an admin', (done) => {
            chai.request(server)
                .post('/api/admin/addadmin')
                .set('Content-Type', 'application/json')

                .send(testData.addAdmin)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })

        }).timeout(10000);

    });
    describe('login an admin', () => {
        it('it should login', (done) => {
            chai.request(server)
                .post('/api/admin/login')
                .set('Content-Type', 'application/json')

                .send(testData.addAdmin)
                .end((err, response) => {
                    // console.log(response);
                    response.should.have.status(200);
                    done();
                })

        }).timeout(10000);

    });
    describe('it should get admin information', () => {
        it('get admin information sucessfullt', (done) => {
            chai.request(server)
                .get('/api/admin/')
                .set('Content-Type', 'application/json')
                .set('x-auth-token', testData.AdminToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                })

        }).timeout(10000);

    });

    describe('it should get the product list', () => {
        it('list all products sucessfully', (done) => {
            chai.request(server)
                .get('/api/product/')
                .set('Content-Type', 'application/json')
                .end((err, response) => {
                    expect(response.body).to.be.an('Array');
                    done();
                })

        }).timeout(10000);

    });
    describe('list all users', () => {
        it('it should get the list of users', (done) => {
            chai.request(server)
                .get(`/api/user/all`)
                .set('Content-Type', 'application/json')
                .set('x-auth-token', testData.AdminToken)
                .end((err, response) => {
                    expect(response.body).to.be.an('Array')
                    done();
                });
        }).timeout(10000);

    });
    describe('Get all Blogs', () => {
        it('it should list of all blog', (done) => {
            chai.request(server)
                .get(`/api/blog/`)
                .set('Content-Type', 'application/json')
                .end((err, response) => {
                    expect(response.body).to.be.an('Array');
                    done();
                });
        }).timeout(10000);

    });

})

// afterAll(done => {
//     Mongoose.connection.close();
//     server.close(done);
// })