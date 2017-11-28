const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var request = require('request')
var mongoose = require('mongoose');
var router = require('./router');
var User = require('../db/userSchema');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GOOGLE_CLIENT_ID = require('../auth-config.js').GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = require('../auth-config.js').GOOGLE_CLIENT_SECRET;

const app = express();

// initialize socket
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser());

// set headers to allow cross-origin requests

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

//initialize express-session and passport

app.use(session({ secret: 'leopard cat' }));
app.use(passport.initialize());
app.use(passport.session());

//serialize & deserialize user

passport.serializeUser(function(user, done) {
  
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Use the GoogleStrategy within Passport.
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
function(token, tokenSecret, profile, done) {
  User.find({ google_id: profile.id }, (err, user) => {

    if (user.length === 0) {
      User.create({google_id: profile.id, displayName: profile.displayName, image: profile._json.image.url, email: profile.emails[0].value, created_sessions: [], accessible_sessions: [], comments: [], new_sessions: []}, (err, user) => {
        if (err) {
          console.log('error in insert user', err);
        } else {
          
          return done(err, user);
        }
      })
    } else {
      return done(err, user[0]);
    }
  });
}
));

// GET /auth/google

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /auth/google/callback
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('req.user in google auth callback function', req.user);
    console.log('req.session.passport.user', req.session.passport.user);
    res.redirect('/home', 200, req.user);
  });

// send user to front end based on session

app.get ('/getUser', function(req, res) {

  User.find({ _id: req.session.passport.user }, (err, user) => {
    if (err) {
      console.log('error in getUser route', err);
    } else {
      
      res.json(user);
    }
  })
});

// check for session for react router

app.get('/authenticate', function(req, res) {

  if(req.session.passport.user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
})

// logout route
app.get('/logout', function(req, res){

  req.logout();
  res.redirect('/');
});

// implement express router

app.use('/', router);

// transpile and serve all static files using webpack

app.use('/static', express.static(path.join(__dirname, '../client/public')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

//socket test
server.listen(3000, function () {
  console.log('Listening on port 3000');
})

io.on('connection', function(socket){
  console.log('a user connected');

  //when the client emits a join session event
  socket.on('join session', function(session_id) {
    //leave the current room (session)
    
    socket.leave(socket.room);
    //join the new session
    socket.join(session_id);
    //let the old session know the user has left:
    socket.to(socket.room).emit('update session', 'a user left the session');
    //let the user know they are in a new session
    socket.emit('update session', 'you have joined session: ', session_id)
    //update the socket session room title
    socket.room = session_id;
    //let other users in the new session know a new user joined
    socket.to(session_id).emit('update session', 'a user joined the session')
    
  })

  //when a client emits a "new comment" event
  socket.on('new comment', function(comments) {
    
    //broadcast the new set of comments to all clients in same room
    socket.to(socket.room).emit('socket comment', comments)
  })

  //when a client emits an "upvote" event
  socket.on('upvote', function(comment) {
    //broadcast the new comment to connected clients
    socket.to(socket.room).emit('upvoted comment', comment)
  })

  //when a client emits a "downvote" event
  socket.on('downvote', function(comment) {
    //broadcast the new comment to connected clients
    socket.to(socket.room).emit('downvoted comment', comment)
  })

  //when a client emit an "update" event
  socket.on('update', function(comment) {
    //broadcast the new comment to connected clients
    socket.to(socket.room).emit('update comment', comment)
  })

  //when a user disconnects, remove the room from its socket
  socket.on('disconnect', function() {
    socket.leave(socket.room);
  })
})

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('join session', function(session_id) {
//     console.log('joining session: ', session_id)
//     socket.join(session_id, () => {
//       console.log('inside join session --> socket.rooms: ', socket.rooms)
//       let rooms = Object.keys(socket.rooms)
//       console.log('rooms: ', rooms)
//       socket.broadcast.emit('rooms', rooms)
//     });
//   })
//   socket.on('leave session', function(session_id) {
//     console.log('leaving session: ', session_id)
//     console.log('inside leaves session --> socket.rooms: ', socket.rooms)
//     socket.leave(session_id, function(err) {
//       if (err) {
//         console.log('error leaving room: ', err)
//       }
//     });
//   })
//   socket.on('new comment', function(data){
//     console.log('comment data received by socket')
//     console.log('session id in socket?', data[0].session_id)
//     socket.broadcast.to(data[0].session_id).emit('socket comment', data);
//   })
//   socket.on('upvote', function(data) {
//     // console.log('upvote received by socket', data)
//     socket.broadcast.to(data.session_id).emit('upvoted comment', data)
//   })
//   socket.on('downvote', function(data) {
//     // console.log('downvote received by socket', data)
//     socket.broadcast.to(data.session_id).emit('downvoted comment', data)
//   })
//   socket.on('update', function(data) {
//     console.log('update received by socket')
//     socket.broadcast.to(data.session_id).emit('update comment', data)
//   })
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });



exports.io = io;

module.exports = app
