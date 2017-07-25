var mocha = require('mocha')
var chai = require('chai')
var mongoose = require('mongoose')

var should = chai.should();
var chaiHttp = require('chai-http');
var app = require('../server/index.js')

var Comment = require('../db/commentSchema');

process.env.NODE_ENV = 'test'

chai.use(chaiHttp);

describe('Comments', function() {

  //drop the current collection
  Comment.collection.drop();

  beforeEach(function(done) {
    //before each test, create and save a test comment to the database

    var newComment = new Comment({
      parent_id: '1111',
      children: [],
      creator_id: '1',
      session_id: '1',
      title: 'test comment',
      text: 'this is a test comment',
      upvotes: [],
      downvotes: [],
      score: 0,
      timestamp: new Date()
    })

    newComment.save(function(err) {
      done();
    });
  });

  afterEach(function(done) {
    //after each test, drop the collection

    Comment.collection.drop();
    done();
  })

  //test GET to /comment
  // it('should return a comment', function(done) {
  //   chai.request(app)
  //     .get('/comment')
  // })

  //test POST to /comment

  //test GET to /allComments
  it('should return all comments matching the session id', function(done) {
    chai.request(app)
      .get('/allComment')
      .query({session_id: '1'})
      .end(function(err, res){
        if (err) {
          console.log('error in test')
        }
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
      })
  })
  //test POST to /edit

  //test POST to /upvote
  //test POST to /downvote


})




