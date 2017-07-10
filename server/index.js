const express = require('express');
const path = require('path');
var router = require('./router')

const app = express();

// transpile and serve all static files using webpack

app.use('/static', express.static(path.join(__dirname, '../client/public')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});


// implement express router

app.use('/', router);


app.listen(3000, function () {
  console.log('Listening on port 3000');
})
