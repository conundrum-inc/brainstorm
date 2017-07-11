const express = require('express');
const mongoose = require('mongoose');
var config = require('../db/config'); // run mongod
var helpers = require('../db/helpers.js');

var router = express.Router();

// authentication -- signup, login, logout (use passport to implement google auth)


// create new session

router.route('/session')
  .post(function(req, res) {
    console.log('REQ.BODY', req.body);
    var user_id = req.body[0].user_id; // make sure this matches up to fetch method body params
    var title = req.body[0].title;
    var text = req.body[0].text;
    var timestamp = new Date();
    helpers.addSession(user_id, timestamp, title, text)
    // .then(helpers.addComment({ user_id: user_id, parent_id: null, session_id: obj.session_id, title: title, text: text, children: [], upvotes: [], downvotes: [], score: 0 }))
    // .then(helpers.findAll(session_id))
    // //call helper function to add session to user permissions
    // helpers.addSessionToUser(params.session_id, user_id, params.creator_id) // THIS CAN'T BE TESTED UNTIL AUTH IS DONE!!!
    // send all comments with session_id to front end
    // helpers.findAll(params.session_id);
  })
  .get(function(req, res) {
    // this is to get all comments for a selected session when a user clicks on an existing session
    var session_id = req.query; // req.query = sessionId ( is it called req.query or req.params? )
    helpers.findAll(session_id);
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
