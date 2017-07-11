const express = require('express');
const mongoose = require('mongoose');
var config = require('../db/config'); // run mongod
var helpers = require('../db/helpers.js');

var router = express.Router();

// authentication -- signup, login, logout (use passport to implement google auth)


// create new session

//NOTE: also need to add sessionId to user [] for session permissions and also render all comments

router.route('/session')
  .post(function(req, res) {
    // call appropriate helper here to create a new session
    creator_id = req.body.user_id // make sure this matches up to fetch method body params
    var timestamp = new Date();
    helpers.addSession(creator_id, timestamp);
    // return comment to front end (will have sessionId attached)
    res.sendStatus(201);
  })
  .get(
    // this is to switch sessions for when a user clicks on an existing session
  )

// create new comment

router.route('/comment')
  .post(function(req, res) {
    // call appropriate helper here to create a new comment (be sure to send comment back to front end)
    var userId = req.body.user_id;
    var parentId = req.body.parent_id;
    var sessionId = req.body.session_id;
    var title = req.body.title;
    var text = req.body.text;

    helpers.addComment({ user_id: userId, parent_id: parentId, session_id: sessionId, title: title, text: text, children: [], upvotes: [], downvotes: [], score: 0 })
  })
  .get(function(req, res) {
    // call appropriate helper here to get a specific comment
    var commentId = req.body.comment_id;
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
    // call appropriate helper here to edit a new comment (WRITE THIS HELPER)
  })


// fetch all comments for a given session

router.route('/allComments')
  .get(function(req, res) {
    //req.query = sessionId
    // call appropriate helper here to fetch all comments for a given session
    var session_id = req.query;
    helpers.findAll(session_id);
  })


// upvote a comment

router.route('/upvote')
  .post(function(req, res) {
    // call appropriate helper here to upvote a comment
    // send score, nothing else
    helpers.upVote(req, res);
    // refactor helper to send updated score
  })


// downvote a comment

router.route('/downvote')
  .post(function(req, res) {
    // call appropriate helper here to downvote a comment
    // send score, nothing else
    helpers.downVote(req, res);
    // refactor helper to send updated score
  })


module.exports = router;
