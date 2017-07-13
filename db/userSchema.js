var mongoose = require('mongoose');

var User = mongoose.Schema({
  // unique id syntax: _id
  google_id: { type: String, required: true },
  displayName: { type: String },
  created_sessions: [],
  accessible_sessions: [], // referes to Session ids
  comments: [] // refers to Comment ids
});

module.exports = mongoose.model('User', User);
