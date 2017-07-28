var mongoose = require('mongoose');
var User = require('./userSchema');
var Session = require('./sessionSchema');
var Comment = require('./commentSchema');

// search for user
function findOneUser(req, res) {
  var id = req.query.id;
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      console.log('error in findUser', err)
    } else {
      console.log('user', user)
      res.json(user);
    }
  })
}

// create new session, add it to user permissions, add first comment to db (ADD COMMENT TO USER COMMENT ARRAY TOO)
function createSession(req, res) {
  var creator_id = req.body.user_id; // make sure this matches up to fetch method body params
  var title = req.body.title;
  var text = req.body.text;
  var timestamp = new Date();

  Session.create({creator_id: creator_id, timestamp: timestamp, title: title, modified: timestamp}, (err, session) => {
    if (err) {
      console.log('error in add session', err)
    } else {
      //saved!
      console.log('session saved', session);
      // add session to user permissions array
      // create comment using session id that was just created
      Comment.create({ creator_id: session.creator_id, parent_id: 'root', session_id: session._id, title: title, text: text, children: [], upvotes: [], downvotes: [], score: 0, timestamp: timestamp }, (err, comment) => {
        if (err) {
          console.log('error in create comment', err)
        } else {
          //saved!
          User.findOne({ _id: creator_id}, (err, user) => {
            if (err) {
              console.log('error in addSessionToUser', err)
            } else {
              user.created_sessions.push(session);
              user.comments.push(comment);
              user.accessible_sessions.push(session);
              user.save();
              console.log('session id saved in user array')
            }
          })
          console.log('comment saved', comment);
          // send comment to front end
          res.json(comment);
        }
      })
    }
  })
};

// fetch all comments for a given session
function findAllComments(req, res) {
  var session_id = req.query.id; // req.query = sessionId ( is it called req.query or req.params? )
  Comment.find({ session_id: session_id }, (err, comments) => {
    if (err) {
      console.log('err: ', err)
      res.sendStatus(400)
    } else {
      // console.log('comments', comments)
      res.json(comments);
    }
  });
}

// add user permissions when they're invited to a session
function addUserPermission(req, res) {
  var emails = req.body.emails;
  var sessionId = req.body.session_id;
  Session.findOne({ _id: sessionId}, (err, session) => {
    if (err) {
      console.log('error finding session', err)
    } else {
      console.log('SESSION', session)
      for (var email of emails) {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            console.log('error in accessible sessions route', err)
          } else {
            if (user) {
              if(!user.accessible_sessions.includes(session)) {
                user.accessible_sessions.push(session);
                user.new_sessions.push(session);
                user.save();
                console.log('session permissions saved')
              } else {
                console.log('user already has permission for this session')
              }
            }
          }
        })
      }
    }
  })
}

// update new sessions array
function newSession(req, res) {
  var id = req.body.id //userId based on state
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      console.log('error in changeNewSessionStatus', err);
    } else {
      user.new_sessions = [];
      user.save();
      console.log('new sessions array reset');
    }
  })
}

// create new comment
function addComment(req, res) {
  var userId = req.body.user_id;
  var parentId = req.body.parent_id;
  var sessionId = req.body.session_id;
  var title = req.body.title;
  var text = req.body.text;
  var timestamp = new Date();

  Session.findOne({_id: sessionId}, (err, session) => {
    if (err) {
      console.log('error in session modified', err)
    } else {
      session.modified = timestamp;
      console.log('session modified', session);
      session.save();
    }
  })

  Comment.create({ creator_id: userId, parent_id: parentId, session_id: sessionId, title: title, text: text, children: [], upvotes: [], downvotes: [], score: 0, timestamp: timestamp }, (err, comment) => {
      if (err) {
        console.log('error!', err)
      } else {
        //saved!
        console.log('comment saved in db');
        User.findOne({ _id: userId}, (err, user) => {
          if (err) {
            console.log('error in addSessionToUser', err)
          } else {
            user.comments.push(comment);
            user.save();
            console.log('comment id saved in user array')
          }
        })
        Comment.findOne({ _id: parentId}, (err, parentComment) => {
          if (err) {
            console.log('error in parent comment', err);
          }
          if (parentComment) {
            parentComment.children.push(comment);
            // console.log('parentComment children', parentComment.children);
            parentComment.save();
            console.log('new comment id saved in children array');
          }
        })
        Comment.findOne({ _id: comment._id }, (err, comment) => {
          if (err) {
            console.log('err in comment find one');
            res.sendStatus(404);
          } else {
            res.json(comment);
          }
      })
    }
  })
};

//find a specific comment
function findComment(req, res) {
  var commentId = req.query.id;
  Comment.findOne({ _id: commentId }, (err, comment) => {
    if (err) {
      console.log('err in /comment get function')
    } else {
      console.log(comment);
      res.json(comment);
    }
  })
}

// edit a comment
function editComment(req, res) {
  var comment_id = req.body.comment_id;
  var title = req.body.title;
  var text = req.body.text;
  Comment.findOne({ _id: comment_id }, (err, comment) => {
    if (err) {
      console.log('error in edit', err);
    } else {
      comment.title = title;
      comment.text = text;
      comment.save();
      res.json(comment);
    }
  });
}



// upvote a comment
function upVote(req, res) {
  var comment_id = req.body.comment_id;
  var clickUser = req.body.user_id;    //clickUser = the user who clicked the upvote button
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
      console.log('upvote saved', comment)
      res.json(comment);
    }
  })
}


// downvote a comment
function downVote(req, res) {
  var comment_id = req.body.comment_id;
  var clickUser = req.body.user_id; //clickUser = the user who clicked the downvote button

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
          comment.score -= 1;
        }
      } else {
        var i = comment.downvotes.indexOf(clickUser);
        comment.downvotes.splice(i, 1);
        comment.score += 1;
      }
      comment.save();
      console.log('downvote saved')
      res.json(comment);
    }
  })
}

// insert user into db
function insertUser(profile) {
  User.create({google_id: profile.id, displayName: profile.displayName, created_sessions: [], accessible_sessions: [], comments: [], new_sessions: []}, (err, user) => {
    if (err) {
      console.log('error in insert user', err);
    } else {
      console.log('user saved');
    }
  })
}

// delete session

// function deleteSession(req, res){
//   var id = req.query.id;
//   console.log('id in delete session', id)
//   Session.findOne({ _id: id }, (err, session) => {
//     if (err) {
//       console.log('error in delete session', err)
//     } else {
//       session.remove();
//       // this also needs to delete the session from the user's accessible_sessions
//       // and remove all comments with that session id
//     }
//   })
//   res.sendStatus(200)
// }




exports.findOneUser = findOneUser;
exports.createSession = createSession;
exports.findAllComments = findAllComments;
exports.addUserPermission = addUserPermission;
exports.newSession = newSession;
exports.addComment = addComment;
exports.findComment = findComment;
exports.editComment = editComment;
exports.upVote = upVote;
exports.downVote = downVote;
exports.insertUser = insertUser;
// exports.deleteSession = deleteSession;
