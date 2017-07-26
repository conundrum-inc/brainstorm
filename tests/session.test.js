var mocha = require('mocha')
var chai = require('chai')
var mongoose = require('mongoose')

var chaiHttp = require('chai-http');
var app = require('../server/index.js')
chai.use(chaiHttp);

var Session = require('../db/sessionSchema');
var User = require('../db/userSchema');
var Comment = require('../db/commentSchema')


describe('Sessions', function() {


  beforeEach(function(done) {

    var newUser = new User({
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
      .post()
  })
  //test GET to /session

  //test POST to /newSessionStatus
})