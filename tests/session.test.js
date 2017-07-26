var mocha = require('mocha')
var chai = require('chai')
var mongoose = require('mongoose')

var chaiHttp = require('chai-http');
var app = require('../server/index.js')
var expect = require('chai').expect
chai.use(chaiHttp);

var Session = require('../db/sessionSchema');
var User = require('../db/userSchema');
var Comment = require('../db/commentSchema')


describe('Sessions', function() {


  beforeEach(function(done) {

    var newUser = new User({
      _id: '1',
      google_id: '1',
      displayName: 'testUser',
      image: 'n/a',
      email: '@example.com',
      created_sessions: [],
      accessible_sessions: [], 
      comments: [], 
      new_sessions: []
    })

    newUser.save(function(err) {
      done();
    })

  })

  afterEach(function(done) {
    Session.collection.drop()
    User.collection.drop()
    Comment.collection.drop()
    done()
  })

  //test POST to /session
  it('should create a new session', function(done) {
    chai.request(app)
      .post('/session')
      .send({
        user_id: '1', 
        title: 'Test Session',
        text: 'This is a test session'
      }).end(function(err, res) {
        if (err) {
          console.log('error in test post session')
        }
        expect(res.status).to.equal(200)
        //should respond with the root comment
        expect(res.body).to.be.a('object')
        expect(res.body.title).to.equal('Test Session')
        done()
      })
  })
  //test GET to /session

  //test POST to /newSessionStatus
})