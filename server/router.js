const express = require('express');
const mongoose = require('mongoose');
var bluebird = require('bluebird');
var passport = require('passport');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../db/config'); // run mongod
var helpers = require('../db/helpers.js');
var User = require('../db/userSchema');
// var GOOGLE_CLIENT_ID = require('../auth-config.js').GOOGLE_CLIENT_ID;
// var GOOGLE_CLIENT_SECRET = require('../auth-config.js').GOOGLE_CLIENT_SECRET;

var router = express.Router();

// authentication -- login, logout

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: '/auth/google/callback'
// },
// function(token, tokenSecret, profile, done) {
//   console.log('profile', profile);
//   User.find({ googleId: profile.id }, function (err, user) {
//     if (err) {
//       helpers.insertUser(profile);
//     } else {
//       return done(err, user);
//     }
//   });
// }
// ));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
// router.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// router.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     console.log('google auth req', req)
//     res.redirect('/');
//   });
//
//
//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
//
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });

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
