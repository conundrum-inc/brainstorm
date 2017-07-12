const express = require('express');
const mongoose = require('mongoose');
var bluebird = require('bluebird');
var config = require('../db/config'); // run mongod
var helpers = require('../db/helpers.js');

var router = express.Router();

// authentication -- signup, login, logout (use passport to implement google auth)


// create new session

router.route('/session')
  .post(function(req, res) {
    console.log('REQ.BODY', req.body);
    helpers.addSession(req, res)
  })
  .get(function(req, res) {
    // this is to get all comments for a selected session when a user clicks on an existing session
    var session_id = req.query.id; // req.query = sessionId ( is it called req.query or req.params? )
    helpers.findAll(session_id, (err, comments) => {
      if (err) {
        console.log('err: ', err)
        res.sendStatus(400)
      } else {
        console.log('comments: ', comments)
        res.send(comments);
      }
    });
  })

// create new comment

router.route('/comment')
  .post(function(req, res) {
    var userId = req.body[0].creator_id;
    var parentId = req.body[0].parent_id;
    var sessionId = req.body[0].session_id;
    var title = req.body[0].title;
    var text = req.body[0].text;

    helpers.addComment({ creator_id: userId, parent_id: parentId, session_id: sessionId, title: title, text: text, children: [], upvotes: [], downvotes: [], score: 0 })
    helpers.findOne({ session_id: sessionId, title: title, text: text }, (err, comment) => {
      if (err) {
        console.log('err in comment find one');
        res.sendStatus(404);
      } else {
        console.log('comment', comment);
        res.send(comment);
      }
    })
  })
  .get(function(req, res) {
    console.log('req.query.id', req.query.id)
    var commentId = req.query.id; // req.query needs to be should be comment_id ( is it called req.query or req.params? )
    helpers.findOne({ _id: commentId }, (err, comment) => {
      if (err) {
        console.log('err in /comment get function')
      } else {
        console.log(comment);
        res.send(comment);
      }
    })
  })

// edit comment

router.route('/edit')
  .post(function(req, res) {
    console.log('edit req.body', req.body)
    var comment_id = req.body[0].comment_id;
    var title = req.body[0].title;
    var text = req.body[0].text;
    helpers.editComment(comment_id, title, text, (err, comment) => {
      if (err) {
        console.log('error in edit', err);
      } else {
        comment.title = title;
        comment.text = text;
        comment.save();
        res.send(comment);
      }
    });
  })


// fetch all comments for a given session

router.route('/allComments')
  .get(function(req, res) {
    //req.query = sessionId ( is it called req.query or req.params? )
    console.log('REQ.QUERY in all comments', req.query.id)
    var session_id = req.query.id;
    helpers.findAll(session_id, (err, comments) => {
      if (err) {
        console.log('err: ', err)
        res.sendStatus(400)
      } else {
        console.log('comments: ', comments)
        res.send(comments);
      }
    });
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
