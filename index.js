// implement your API here

const express = require('express');
const db = require('./data/db');

const server = express();

server.listen(4000, () => {
  console.log('server listening on port 4000')
});

server.get('/api/users', (req, res) => {
  db.find().then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    res.status(500).json({
      message: err,
      success: false
    });
  });
})

// console.log("Hey Brit")