var mocha = require('mocha')
var chai = require('chai')
var mongoose = require('mongoose')

var chaiHttp = require('chai-http');
var app = require('../server/index.js')

var User = require('../db/userSchema');

chai.use(chaiHttp);

