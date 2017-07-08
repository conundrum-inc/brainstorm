var mongoose = require('mongoose');

var Comment = mongoose.Schema({
  // unique id look up syntax
  parent_id: {type: String, required: true},
  children: [],
  creator_id: {type: String, required: true}, // references User
  session_id: {type: String, required: true}, // references Session
  title: {type: String, required: true},
  text: {type: String},
  upvotes: [], // references User (ids)
  downvotes: [], // references User (ids)
  score: {type: Number, required: true}
});

module.exports = mongoose.model('Comment', Comment);
