// implement your API here

const express = require('express');
const db = require('./data/db');

const server = express();

server.listen(4000, () => {
  console.log('server listening on port 4000')
});

server.use(express.json());

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
  // console.log(userInfo);

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

server.delete('/api/users/:id', (req, res) =>{
  const {id} = req.params;

  db.remove(id).then(deletedUser => {
    if (deletedUser) {
      res.status(204).end();
    } else {
      res.status(404).json({message: `Unable to find id=${id}`})
    }
  })
  .catch(err => {
    res.status(500).json({ error: "The user could not be removed"})
  })
})

server.put('/api/users/:id', (req, res) => {
  const {id} = req.params;
  const userInfo = req.body;

  db.update(id, userInfo)
  .then(user => {
    if (user) {
      res.status(200).json({
        success: true, user
      })
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      })
    }
  })

  .catch(err => {
    res.status(500).json({
      error: "The user information could not be modified.", err
    })
  })
})
// console.log("Hey Brit")