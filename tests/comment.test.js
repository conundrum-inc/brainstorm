var mocha = require('mocha')
var chai = require('chai')
var mongoose = require('mongoose')
var bluebird = require('bluebird')

var chaiHttp = require('chai-http');
var app = require('../server/index.js')
chai.use(chaiHttp);

var Comment = require('../db/commentSchema');
var expect = require('chai').expect

describe('Comments', function() {

  
  

  beforeEach(function(done) {
    //before each test, create and save a test comment to the database

    var newComment1 = new Comment({
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
    var newComment2 = new Comment({
      parent_id: '1111',
      children: [],
      creator_id: '1',
      session_id: '1',
      title: 'test comment 2',
      text: 'this is a test comment, 2',
      upvotes: [],
      downvotes: [],
      score: 0,
      timestamp: new Date()
    })

    newComment1.save(function(err) {
      if (err) {
        console.log('error in test comment 2 save')
      }
    });
    newComment2.save(function(err) {
      if (err) {
        console.log('error in test comment 2 save')
      }
      done();
    })
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
  it('should post a comment to the database', function(done) {
    chai.request(app)
      .post('/comment')
      .send({
              parent_id: '1111',
              children: [],
              user_id: '1',
              session_id: '1',
              title: 'test comment 3',
              text: 'this is a test comment, 3'
            })
      .end(function(err, res){
        if (err) {
          console.log('error in test')
        }
        
        expect(res.status).to.equal(200)
        expect(res).to.be.a('object')
        expect(res.body.title).to.equal('test comment 3')
        done()
      })
  })

  //test GET to /allComments
  it('should return all comments matching the session id', function(done) {
    chai.request(app)
      .get('/allComments')
      .query({'id': '1'})
      .end(function(err, res){
        if (err) {
          console.log('error in test')
        }
        expect(res.status).to.equal(200)
        expect(res.body).to.be.a('array')
        expect(res.body.length).to.equal(2)
        done()
      })
      
  })

  //test POST to /edit

  //test POST to /upvote

  //test POST to /downvote


})




