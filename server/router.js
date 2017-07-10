const express = require('express');
const mongoose = require('mongoose');
var config = require('../db/config'); // run mongod
var helpers = require('../db/helpers.js');

var router = express.Router();

// authentication -- signup, login, logout (use passport to implement google auth)


// create new session

router.route('/session')
  .post(function(req, res) {
    // call appropriate helper here to create a new session
  })

// create new comment

router.route('/comment')
  .post(function(req, res) {
    // call appropriate helper here to create a new comment
  })
  .get(function(req, res) {
    // call appropriate helper here to get a specific comment
  })


// fetch all comments for a given session

router.route('/fetchComments')
  .get(function(req, res) {
    // call appropriate helper here to fetch all comments for a given session
  })


// upvote a comment

router.route('/upvote')
  .post(function(req, res) {
    // call appropriate helper here to upvote a comment
  })


// downvote a comment

router.route('/upvote')
  .post(function(req, res) {
    // call appropriate helper here to downvote a comment
  })


module.exports = router;
