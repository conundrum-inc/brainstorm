var mongoose = require('mongoose');
var config = require('./config.js'); // only necessary in here when server is NOT running 
var User = require('./userSchema.js');


  var Misha = new User ({
    username: 'Misha',
    created_sessions: [],
    accessible_sessions: [],
    comments: [] // refers to Comment ids
  })

  Misha.save(function(err, data) {
    if (err) {
      console.log('ERROR', err);
    } else {
      console.log('DATA', data);
    }
  });

// var Comment = mongoose.Schema({
//   // unique id syntax: _id
//   parent_id: {type: String, required: true},
//   children: [],
//   creator_id: {type: String, required: true}, // references User
//   session_id: {type: String, required: true}, // references Session
//   title: {type: String, required: true},
//   text: {type: String},
//   upvotes: [], // references User (ids)
//   downvotes: [], // references User (ids)
//   score: {type: Number, required: true}
// });

export const seedComments = [
  { parent_id: 'root',
    children: [1, 2, 3, 4],
    creator_id: '1234',
    session_id: '1',
    title: 'Lunch?',
    text: 'Where should we go to lunch?',
    upvotes: [],
    downvotes: [],
    score: 0
  },
  { parent_id: 2},
  {},
  {},
  {},
]
