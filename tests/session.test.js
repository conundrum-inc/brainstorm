import mocha from 'mocha'
import chai from 'chai'
import mongoose from 'mongoose'

var should = chai.should();
var chaiHttp = require('chai-http');

var Session = require('./sessionSchema');

var db = mongoose.connect('mongodb://localhost/brainstorm');

process.env.NODE_ENV = 'test'

chai.use(chaiHttp);

describe('Sessions', function() {

  Sessions.collection.drop();

  beforeEach(function(done) {

    var newSession = new Session({
      creator_id: '1', // references User
      timestamp: 'test timestamp',
      title: 'Test Session',
      modified: new Date()
    })

    newSession.save(function(err) {
      done()
    })
  })

  afterEach(function(done) {
    Session.collection.drop()
    done()
  })

  //test POST to /session
  //test GET to /session

  //test POST to /newSessionStatus
})