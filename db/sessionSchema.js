var mongoose = require('mongoose');


var Session = mongoose.Schema({
  // unique id -- look up syntax
  creator_id: {type: String, required: true}, // references User
  timestamp: {type: String, required: true}
})

module.exports = mongoose.model('Session', Session);
