const express = require('express');
const mongoose = require('mongoose');
var bluebird = require('bluebird');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../db/config'); // run mongod
var helpers = require('../db/helpers.js');
var User = require('../db/userSchema');
var GOOGLE_CLIENT_ID = require('../auth-config.js').GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = require('../auth-config.js').GOOGLE_CLIENT_SECRET;

var router = express.Router();

// find a specific user
router.route('/findUser')
  .get(function(req, res){
    var id = req.query.id;
    User.findOne({ _id: id}, (err, user) => {
      if (err) {
        console.log('error in findUser', err)
      } else {
        console.log('user', user)
        res.json(user);
      }
    })
  })

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
        res.json(comments);
      }
    });
  })

// create new comment

router.route('/comment')
  .post(function(req, res) {
    console.log('req.body', req.body)
    var userId = req.body.user_id;
    var parentId = req.body.parent_id;
    var sessionId = req.body.session_id;
    var title = req.body.title;
    var text = req.body.text;

    helpers.addComment({ creator_id: userId, parent_id: parentId, session_id: sessionId, title: title, text: text, children: [], upvotes: [], downvotes: [], score: 0 }, (err, comment) => {
        if (err) {
          console.log('error!', err)
        } else {
          //saved!
          console.log('comment saved in db!');
          User.findOne({ _id: userId}, (err, user) => {
            if (err) {
              console.log('error in addSessionToUser', err)
            } else {
              user.comments.push(comment._id);
              user.save();
              console.log('comment id saved in user array!!')
            }
          })
          helpers.findOne({ _id: comment._id }, (err, comment) => {
            if (err) {
              console.log('err in comment find one');
              res.sendStatus(404);
            } else {

              res.json(comment);
            }
        })
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
        res.json(comment);
      }
    })
  })

// edit comment

router.route('/edit')
  .post(function(req, res) {
    console.log('edit req.body', req.body)
    var comment_id = req.body.comment_id;
    var title = req.body.title;
    var text = req.body.text;
    helpers.editComment(comment_id, title, text, (err, comment) => {
      if (err) {
        console.log('error in edit', err);
      } else {
        comment.title = title;
        comment.text = text;
        comment.save();
        res.json(comment);
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
        res.json(comments);
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
