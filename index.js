// implement your API here

const express = require('express');

const server = express();

server.listen(4000, () => {
  console.log('server listening on port 4000')
});

server.get('/api/users', (req, res) => {
  // console.log('you asked');
  res.send('Hello Moto...')
})

// console.log("Hey Brit")