var mongoose = require('mongoose');


var Session = mongoose.Schema({
  // unique id syntax: _id
  creator_id: {type: String, required: true}, // references User
  timestamp: {type: String, required: true},
  title: {type: String, required: true}
})

module.exports = mongoose.model('Session', Session);
