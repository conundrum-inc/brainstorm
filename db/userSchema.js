var mongoose = require('mongoose');

var User = mongoose.Schema({
  // unique id syntax: _id
  google_id: { type: String },
  username: {type: String, required: true},
  created_sessions: [],
  accessible_sessions: [], // referes to Session ids
  comments: [] // refers to Comment ids
});

module.exports = mongoose.model('User', User);
