const chai = require('chai');
const chaiHttp = require('chai-http');

const {
    app, runServer, closeServer
} = require('../server');

// this lets us use *should* style syntax in our tests
// so we can do things like `(1 + 1).should.equal(2);`
// http://chaijs.com/api/bdd/
const should = chai.should();


// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);
const expectedKeys = ['id', 'title', 'content', 'author'];
describe('Blog Posts', function () {
    before(function () {
        return runServer();
    });

    after(function () {
        return closeServer();
    });

    it('should list items on GET', function () {
        return chai.request(server)
            .get('/blog-api')
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.be.at.least(1);

                res.body.forEach(function (item) {
                    item.should.be.a('object');
                    item.should.include.keys(expectedKeys);
                });
            });
    });
    it('should add an item when we POST', function () {
        const testPost = {
            title: 'Hey',
            content: 'Hey',
            author: 'Andre'
        }
        return .chai.request(server)
            .post('/blog-post')
            .send(testPost)
            .then(function (res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys(expectedKeys);
                res.body.id.should.not.be.null;
                res.body.title.should.equal(testPost.title);
                res.body.content.should.equal(testPost.content);
                res.body.author.should.equal(testPost.author)
            })
    });
    it('should update items o PUT', function () {
        const testPut = {
            title: 'Hey',
            content: 'Hey',
            author: 'Andre'
        }
        return chai.request(server)
            .get('/blog-api')
            .then(function (res) {
                testPut.id = res.body[0].id;
                return chai.request(server)
                    .put(`/blog-api/${testPut.id}`)
                    .send(testPut)
            })
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.deep.equal(testPut);
            });
    });
    it('should delete items on DELETE', function () {
        return chai.request(server)
            .get('/blog-api')
            .then(function (res) {
                return chai.request(server)
                    .delete(`/blog-api/${res.body[0].id}`);
            })
            .then(function (res) {
                res.should.have.status(204);
            });
    });

});
