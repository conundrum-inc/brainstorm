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
    // call appropriate helper here to create a new comment (be sure to send comment back to front end)
  })
  .get(function(req, res) {
    // call appropriate helper here to get a specific comment
  })

// edit comment

router.route('/edit')
  .post(function(req, res) {
    // call appropriate helper here to edit a new comment (WRITE THIS HELPER)
  })


// fetch all comments for a given session

router.route('/allComments')
  .get(function(req, res) {
    //req.query = sessionId
    // call appropriate helper here to fetch all comments for a given session
  })


// upvote a comment

router.route('/upvote')
  .post(function(req, res) {
    // call appropriate helper here to upvote a comment
    // send score, nothing else
  })


// downvote a comment

router.route('/downvote')
  .post(function(req, res) {
    // call appropriate helper here to downvote a comment
    // send score, nothing else
  })


module.exports = router;
