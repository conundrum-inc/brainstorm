var mongoose = require('mongoose');
var User = require('./userSchema');
var Session = require('./sessionSchema');
var Comment = require('./commentSchema');

// authentication -- figure out what's needed here from passport

function insertUser(profile) {
  User.create({google_id: profile.id, displayName: profile.displayName, created_sessions: [], accessible_sessions: [], comments: []}, (err, user) => {
    if (err) {
      console.log('error in insert user', err);
    } else {
      console.log('user saved!');
    }
  })
}

// create new comment

function addComment(params, cb) {
  // params should be an object including the follwoing keys: parent_id, children, creator_id, session_id, title, text, upvotes, downvotes, score

  //NOTE: add all new comments to parent comment's children array
  console.log('addComment params', params)

  Comment.create(params, cb);
};

// fetch a single comment (used to modify data e.g. upvotes etc) --> is this necessary?? method already built in

function findOne(params, cb) {
  Comment.findOne(params, cb);
};

// fetch all comments for a given session

function findAll(session_id, cb) {
  Comment.find({ session_id: session_id }, cb);
}

//edit a comment

function editComment(comment_id, title, text, cb) {
  Comment.findOne({ _id: comment_id }, cb)
}

// upvote a comment

function upVote(req, res) {
  var comment_id = req.body[0].comment_id;
  var clickUser = req.body[0].user_id;
  console.log('upvote variables', comment_id, clickUser)
  //clickUser = the user who clicked the upvote button
  console.log('in upVote!!!')

  Comment.findOne({ _id: comment_id }, (err, comment) => {
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
      res.json({score: comment.score});
    }
  })
}


// downvote a comment

function downVote(req, res) {
  var comment_id = req.body[0].comment_id;
  var clickUser = req.body[0].user_id;
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
      res.json({score: comment.score});
    }
  })
}

// create new session

function addSession(req, res) {
// be sure to add timestamp in the router
  var creator_id = req.body[0].user_id; // make sure this matches up to fetch method body params
  var title = req.body[0].title;
  var text = req.body[0].text;
  var timestamp = new Date();
  console.log('addSession params', creator_id, timestamp, title, text)

  Session.create({creator_id: creator_id, timestamp: timestamp}, (err, session) => {
    if (err) {
      console.log('error in add session!', err)
    } else {
      //saved!
      console.log('session saved!');
      // return session_id
      console.log('SESSION ID', session._id)
      Comment.create({ creator_id: session.creator_id, parent_id: 'root', session_id: session._id, title: title, text: text, children: [], upvotes: [], downvotes: [], score: 0 }, (err, comment) => {
        if (err) {
          console.log('error!', err)
        } else {
          //saved!
          console.log('comment saved!');
          Comment.find({session_id: session._id}, (err, comments) => {
            if (err) {
              console.log('err: ', err)
              res.sendStatus(400)
            } else {
              console.log('comments: ', comments)
              res.json(comments);
            }
          });
        }
      })
    }
  })
};

// add session to user permissions array -- TEST THIS AFTER AUTHENTICATION IS IMPLEMENTED!!!!

function addSessionToUser(session_id, user_id, creator_id) {
// be sure to add timestamp in the router
  User.findOne( { _id: user_id }, (err, user) => {
    if (err) {
      console.log('error in permissions helper', err)
    } else {
      if (user_id === creator_id && !user.created_sessions.includes(session_id)) {
        user.created_sessions.push(session_id);
        console.log('session permissions updated!')
      } else if (!user.accessible_sessions.includes(session_id)) {
        user.accessible_sessions.push(session_id);
        console.log('session permissions updated!')
      }
    }
  });
};



// remember to export these and import them in the router file

exports.findAll = findAll;
exports.findOne = findOne;
exports.addSession = addSession;
exports.addComment = addComment;
exports.editComment = editComment;
exports.upVote = upVote;
exports.downVote = downVote;
exports.insertUser = insertUser;
