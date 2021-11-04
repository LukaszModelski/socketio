const express = require('express');
const socketio = require('socket.io');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('helllllo');
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = socketio(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");
});
