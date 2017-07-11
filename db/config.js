var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/brainstorm');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('mongo is running')
});
