import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

const serverConfig = {
  port: process.env.PORT || 3000
}

const ioServerConfig = {
  cors: {
    origin: '*'
  }
}

let users = [];

app.use(cors());
app.get('/', (req, res) => {
  res.send('helllllo2');
});

// express server
const server = app.listen(serverConfig.port, () => {
  console.log(`Server listening on port ${serverConfig.port}`);
});

//socker.io server
const ioServer = new Server(server, ioServerConfig);

ioServer.on("connection", (socket) => {
  ioServer.emit('users', users);

  socket.on('new user', newUser => {
    socket.userName = newUser;
    users.push(newUser);
    ioServer.emit('users', users);
  });

  socket.on("disconnect", () => {
    if (socket.userName) {
      users = users.filter(user => user !== socket.userName);
      console.log(`User "${socket.userName}" disconected.`);
      ioServer.emit('users', users);
    }
  });
});
