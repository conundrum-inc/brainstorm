var mongoose = require('mongoose');
var User = require('./userSchema');
var Session = require('./sessionSchema');
var Comment = require('./commentSchema');

// authentication -- figure out what's needed here from passport


// create new session

function addSession(creator_id, timestamp) {
// be sure to add timestamp in the router
  console.log('addSession params', creator_id, timestamp)

  Session.create({creator_id: creator_id, timestamp: timestamp}, (err, session) => {
    if (err) {
      console.log('error!', err)
    } else {
      //saved!
      console.log('saved!');
    }
  })
};


// create new comment

function addComment(params) {
  // params should be an object including the follwoing keys: parent_id, children, creator_id, session_id, title, text, upvotes, downvotes, score

  //NOTE: add all new comments to parent comment's children array
  console.log('addComment params', params)

  Comment.create(params, (err, comment) => {
    if (err) {
      console.log('error!', err)
    } else {
      //saved!
      console.log('saved!');
      res.send(comment);
    }
  })
};

//NOTE: add edit comment function

// fetch a single comment (used to modify data e.g. upvotes etc) --> is this necessary?? method already built in

function findOne(comment_id, cb) {
  Comment.findOne({ _id: comment_id }, cb);
};

// fetch all comments for a given session

function findAll(session_id) {
  Comment.find({ session_id: session_id }, (err, comments) => {
    if (err) {
      console.log('err: ', err)
      res.sendStatus(400)
    } else {
      console.log('comments: ', comments)
      res.send(comments);
    }
  });
}


// upvote a comment

function upVote(req, res) {    // refactor this to send score not status
  var comment_id = req.body.comment_id;
  var clickUser = req.body.user_id;
  //clickUser = the user who clicked the upvote button
  console.log('in upVote!!!')

  Comment.findOne({ _id: comment_id }, function(err, comment) {
    if (err) {
      console.log('error in upvote', err);
      res.sendStatus(400);
    } else {
      if (!comment.upvotes.includes(clickUser)) {
        comment.upvotes.push(clickUser)
        comment.score += 1;
        if (comment.downvotes.includes(clickUser)) {
          var i = comment.downvotes.indexOf(clickUser)
          comment.downvotes.splice(i, 1)
          comment.score += 1
        }
      } else {
        var i = comment.upvotes.indexOf(clickUser);
        comment.upvotes.splice(i, 1);
        comment.score -= 1;
      }
      comment.save();
      console.log('upvote saved!')
      res.sendStatus(201);
    }
  })
}


// downvote a comment

function downVote(req, res) {     // refactor this to send score not status
  var comment_id = req.body.comment_id;
  var clickUser = req.body.user_id;
  //clickUser = the user who clicked the upvote button
  console.log('in downVote!!!')

  Comment.findOne({ _id: comment_id }, function(err, comment) {
    if (err) {
      console.log('error in downvote', err);
      res.sendStatus(400);
    } else {
      if (!comment.downvotes.includes(clickUser)) {
        comment.downvotes.push(clickUser)
        comment.score -= 1;
        if (comment.upvotes.includes(clickUser)) {
          var i = comment.upvotes.indexOf(clickUser)
          comment.upvotes.splice(i, 1)
          comment.score -= 1
        }
      } else {
        var i = comment.downvotes.indexOf(clickUser);
        comment.downvotes.splice(i, 1);
        comment.score += 1;
      }
      comment.save();
      console.log('downvote saved!')
      res.sendStatus(201);
    }
  })
}


// remember to export these and import them in the router file

exports.findAll = findAll;
exports.findOne = findOne;
exports.addSession = addSession;
exports.addComment = addComment;
exports.upVote = upVote;
exports.downVote = downVote;
