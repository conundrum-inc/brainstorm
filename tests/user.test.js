var mocha = require('mocha')
var chai = require('chai')
var mongoose = require('mongoose')

var chaiHttp = require('chai-http');
var app = require('../server/index.js')

var User = require('../db/userSchema');

chai.use(chaiHttp);

describe('Users', function() {

  beforeEach(function(done)) {

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

    newUser.save()
  
  }
  
})