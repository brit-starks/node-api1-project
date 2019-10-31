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
      error: "The users information could not be retrieved."
    });
  });
});

server.post('/api/users', (req, res) => {
  const userInfo = req.body;

  db.insert(userInfo)
    .then((user) => {
      res.status(201).json({
        success: true, user
      })
    })
    .catch((err) => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      })
    });
});

// console.log("Hey Brit")