const express = require('express');
const mongoose = require('mongoose');
var config = require('../db/config'); // run mongod
var helpers = require('../db/helpers.js');

var router = express.Router();

// authentication -- signup, login, logout (use passport to implement google auth)


// create new session

router.route('/session')
  .post(function(req, res) {
    user_id = req.body.user_id // make sure this matches up to fetch method body params
    var timestamp = new Date();
    var params = helpers.addSession(user_id, timestamp);

    //call helper function to add session to user permissions
    helpers.addSessionToUser(params.session_id, user_id, params.creator_id);
    // send all comments with session_id to front end
    helpers.findAll(params.session_id);
  })
  .get(function(req, res) {
    // this is to get all comments for a selected session when a user clicks on an existing session
    var session_id = req.query; // req.query = sessionId ( is it called req.query or req.params? )
    helpers.findAll(session_id);
  })

// create new comment

router.route('/comment')
  .post(function(req, res) {
    var userId = req.body.user_id;
    var parentId = req.body.parent_id;
    var sessionId = req.body.session_id;
    var title = req.body.title;
    var text = req.body.text;

    helpers.addComment({ user_id: userId, parent_id: parentId, session_id: sessionId, title: title, text: text, children: [], upvotes: [], downvotes: [], score: 0 })
  })
  .get(function(req, res) {
    var commentId = req.query; // req.query needs to be should be comment_id ( is it called req.query or req.params? )
    helpers.findOne(commentId, (err, comment) => {
      if (err) {
        console.log('err in /comment get function')
      } else {
        res.send(comment);
      }
    })
  })

// edit comment

router.route('/edit')
  .post(function(req, res) {
    helpers.editComment(comment_id, title, text);
  })


// fetch all comments for a given session

router.route('/allComments')
  .get(function(req, res) {
    //req.query = sessionId ( is it called req.query or req.params? )
    var session_id = req.query;
    helpers.findAll(session_id);
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
