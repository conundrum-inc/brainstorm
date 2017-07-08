const express = require('express')
const path = require('path')

const app = express()

app.use('/static', express.static(path.join(__dirname, '../client/public')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});


app.listen(3000, function () {
  console.log('Listening on port 3000')
})
