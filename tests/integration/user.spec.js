const { expect } = require('chai');
const { number } = require('joi');
const request = require('supertest');
const app = require('../../index');

describe('User APIs', async () => {
    let userToken = '';
    let bookId = '';
    describe('Signup user - 400 codes', () => {
        it('should fail signing up a new user without name - 400', (done) => {
            request(app)
            .post('/api/v1/users/signup')
            .set('Accept', 'application/json')
            .send({
                email: "gracela@gmail.com",
                password: "123456"
            })
            .end((err, res) => {
                console.log(res.body);
                expect(res.statusCode).to.be.equal(400);
                expect(res.body.code).to.be.equal(400);
                expect(res.body.message).to.be.equal('name is required');
                done();
            });

        });

        it('should sign up user - 200', (done) => {
            request(app)
                .post('/api/v1/users/signup')
                .set('Accept', 'application/json')
                .send({
                    name: "Gracela",
                    email: "gracela@gmail.com",
                    password: "123456"
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(201);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.message).to.be.equal('New user added successfully');
                    expect(res.body.code).to.be.equal(201);
                    done();
                });

        });

        it('should login user - 200', (done) => {
            request(app)
                .post('/api/v1/users/login')
                .set('Accept', 'application/json')
                .send({
                    email: "gracela@gmail.com",
                    password: "123456"
                })
                .end((err, res) => {
                    userToken = res.body.data.token;
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('Authentication successful');
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data.user).to.be.an('object');
                    expect(res.body.data.user.email).to.be.equal('gracela@gmail.com');
                    expect(res.body.data.token).to.be.a('string');
                    expect(res.body.code).to.be.equal(200);
                    done();
                });
        });

        it('should create a book', (done) => {
            request(app)
            .post('/api/v1/books')
            .set('authorization', userToken)
            .set('Accept', 'application/json')
            .send({
                title: 'The Trial',
                author: 'Franz Kafka'
            })
            .end((err, res) => {
                bookId = res.body.data.id;
                console.log(res.body);
                expect(res.statusCode).to.be.equal(201);
                expect(res.body.code).to.be.equal(201);
                expect(res.body.status).to.be.equal('success');
                expect(res.body.message).to.be.equal('Book added successfully');
                expect(res.body.data).to.be.an('object');
                done();
            })
        });

        it('should not add a book without a title', (done) => {
            request(app)
                .post('/api/v1/books')
                .set('authorization', userToken)
                .set('Accept', 'application/json')
                .send({
                    author: 'Franz Kafka'
                })
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(400);
                    expect(res.body.code).to.be.equal(400);
                    expect(res.body.message).to.be.equal('title is required');
                    done();
                })
        });
        
        it('should update a book', (done) => {
            request(app)
                .put(`/api/v1/books/${bookId}`)
                .set('authorization', userToken)
                .set('Accept', 'application/json')
                .send({
                    title: 'Metamorphosis',
                    author: 'Franz Kafka'
                })
                .end((err, res) => {
                    console.log(res.body);
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body.code).to.be.equal(200);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('Book updated successfully');
                    expect(res.body.data).to.be.an('object');
                    done();
                })
        });

        it('should delete a book', (done) => {
            request(app)
                .delete(`/api/v1/books/${bookId}`)
                .set('authorization', userToken)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.body);
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.body.code).to.be.equal(200);
                    expect(res.body.status).to.be.equal('success');
                    expect(res.body.message).to.be.equal('Book deleted successfully');
                    done();
                })
        });

    });
})