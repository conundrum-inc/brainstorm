const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var router = require('./router');
var User = require('../db/userSchema');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GOOGLE_CLIENT_ID = require('../auth-config.js').GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = require('../auth-config.js').GOOGLE_CLIENT_SECRET;

const app = express();

app.use(bodyParser());

//initialize express-session and passport

app.use(session({ secret: 'leopard cat' }));
app.use(passport.initialize());
app.use(passport.session());

//serialize & deserialize user

passport.serializeUser(function(user, done) {
  console.log('SERIALIZE', user)
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log('DESERIALIZE', id)
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
  console.log('profile', profile.id);
  User.find({ google_id: profile.id }, (err, user) => {
    console.log('user from google strategy', user);
    if (user.length === 0) {
      User.create({google_id: profile.id, displayName: profile.displayName, created_sessions: [], accessible_sessions: [], comments: []}, (err, user) => {
        if (err) {
          console.log('error in insert user', err);
        } else {
          console.log('user saved!');
          console.log('user from google strategy', user);
          return done(err, user);
        }
      })
    } else{
      return done(err, user[0]);
    }
  });
}
));

// GET /auth/google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

// GET /auth/google/callback
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// logout route
app.get('/logout', function(req, res){
  console.log('LOGOUT')
  req.logout();
  res.redirect('/login');
});

// implement express router

app.use('/', router);

// transpile and serve all static files using webpack

app.use('/static', express.static(path.join(__dirname, '../client/public')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});



app.listen(3000, function () {
  console.log('Listening on port 3000');
})
