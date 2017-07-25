const express = require('express');
const mongoose = require('mongoose');
var bluebird = require('bluebird');
var config = require('../db/config'); // run mongod
var helpers = require('../db/helpers.js');

var router = express.Router();

// find a specific user
  router.route('/findUser')
    .get(function(req, res){
      helpers.findOneUser(req, res);
    })

// create new session
  router.route('/session')
    .post(function(req, res) {
      helpers.createSession(req, res)
    })
    .get(function(req, res) {
      // this is to get all comments for a selected session when a user clicks on an existing session
      helpers.findAllComments(req, res);
    })

// modify accessible sessions for an invited user
  router.route('/addUserToSession')
    .post(function(req, res){
      helpers.addUserPermission(req, res);
    })

// change status of new_sessions
  router.route('/newSessionStatus')
    .post(function(req, res) {
      helpers.newSession(req, res);
    });

// create new comment & retrieve a specific comment
  router.route('/comment')
    .post(function(req, res) {
      helpers.addComment(req, res);
    })
    .put(function(req, res) {
      helpers.editComment(req, res);
    })
    .get(function(req, res) {
      helpers.findComment(req, res);
    })


// fetch all comments for a given session
  router.route('/allComments')
    .get(function(req, res) {
      helpers.findAllComments(req, res);
    })


// upvote a comment
  router.route('/upvote')
    .post(function(req, res) {
      // send score, nothing else
      helpers.upVote(req, res);
    })


// downvote a comment
  router.route('/downvote')
    .post(function(req, res) {
      // send score, nothing else
      helpers.downVote(req, res);
    })


module.exports = router;
