import mocha from 'mocha'
import chai from 'chai'
import mongoose from 'mongoose'

var should = chai.should();
var chaiHttp = require('chai-http');

var User = require('../db/userSchema');

var db = mongoose.connect('mongodb://localhost/brainstorm');

process.env.NODE_ENV = 'test'

chai.use(chaiHttp);