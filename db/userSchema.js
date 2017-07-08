var mongoose = require('mongoose');

var User = mongoose.Schema({
  // unique id look up syntax
  username: {type: String, required: true},
  sessions: [], // referes to Session ids
  comments: [] // refers to Comment ids
});

module.exports = mongoose.model('User', User);
