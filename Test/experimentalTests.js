const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
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
                .delete('/api/user/delete')
                .set('Content-Type', 'application/json')
                .set('x-auth-token', testData.Token)
                .send({
                    "id": "5ff49215073e021e54403cc9",
                    "password": "Test1234!",
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

    describe('Create a new Product', () => {
        it('it should create product', (done) => {
            chai.request(server)
                .post(`/api/product/addproduct`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .attach('image', '../client/public/Image/test.png')
                .set('x-auth-token', testData.AdminToken)
                // .send(testData.addProduct)
                .field('extra_info', testData.addProduct)
                .end((err, response) => {
                    console.log(response.body);
                    response.should.have.status(200);
                    done();
                });
        }).timeout(10000);

    });


    describe('it should get a certain product', () => {
        it('list one products sucessfully', (done) => {
            chai.request(server)
                .get(`/api/product/${testData.listOneProduct}`)
                .set('Content-Type', 'application/json')
                .set('x-auth-token', testData.AdminToken)
                .end((err, response) => {
                    expect(response.body).to.be.an('Object');
                    done();
                })

        }).timeout(10000);

    });



    describe('delete the existing product', () => {
        it('it should delete the  product', (done) => {
            chai.request(server)
                .delete(`/api/product/${testData.deleteProduct}`)
                .set('Content-Type', 'application/json')
                .set('x-auth-token', testData.AdminToken)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        }).timeout(10000);

    });

    describe('reset user password', () => {
        it('it should reset the user password', (done) => {
            chai.request(server)
                .post(`/api/user/reset-password`)
                .set('Content-Type', 'application/json')
                .send(testData.resetPasswordEmail)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
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
    describe('Add a product to Cart', () => {
        it('it should Add a product to cart', (done) => {
            chai.request(server)
                .post(`/api/cart/add`)
                .set('Content-Type', 'application/json')
                .set('x-auth-token', testData.AdminToken)
                .send(testData.addToCart)
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        }).timeout(10000);

    });
    describe('Auth to Cart', () => {
        it('it should auth', (done) => {
            chai.request(server)
                .post(`/api/cart/auth`)
                .set('Content-Type', 'application/json')
                .set('x-auth-token', testData.AdminToken)
                .send(testData.addToCart)
                .end((err, response) => {
                    response.should.have.status(200);
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



    describe('Creating a Blog', () => {
        it('it should create Blog', (done) => {
            chai.request(server)
                .post('/api/blog/addblog')
                .set('Content-Type', 'application/json')
                .set('x-auth-token', testData.adminToken)
                .send(
                    testdata.addBlog
                )
                .end((err, response) => {
                    console.log(response);
                    response.should.have.status(200);
                    done();
                })

        }).timeout(10000);



    });

    describe('Delete a blog', () => {
        it('it should delete a blog', (done) => {
            chai.request(server)
                .delete(`/api/blog/${testData.DeleteBlogId}`)
                .set('Content-Type', 'application/json')
                .set('x-auth-token', testData.AdminToken)
                .end((err, response) => {
                    expect(response.body).to.be.an('Array');
                    done();
                });
        }).timeout(10000);

    });




})



