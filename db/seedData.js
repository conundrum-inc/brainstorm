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

  // {
  //   username: 'Molly',
  //   sessions: [], // referes to Session ids
  //   comments: [] // refers to Comment ids
  // },
  // {
  //   username: 'Hank',
  //   sessions: [], // referes to Session ids
  //   comments: [] // refers to Comment ids
  // },
  // {
  //   username: 'Jordan',
  //   sessions: [], // referes to Session ids
  //   comments: [] // refers to Comment ids
  // }
