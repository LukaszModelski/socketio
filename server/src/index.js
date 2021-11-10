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

const MAX_MESSAGES = 50;
let users = [];
let messages = [];

app.use(cors());

// express server
const server = app.listen(serverConfig.port, () => {
  console.log(`Server listening on port ${serverConfig.port}`);
});

//socker.io server
const ioServer = new Server(server, ioServerConfig);

ioServer.on("connection", (socket) => {
  socket.emit('users', users);
  socket.emit('messages', messages);

  socket.on('new user', newUser => {
    console.log(`New user: "${newUser}"`);
    socket.userName = newUser;
    users.push(newUser);
    ioServer.emit('users', users);
  });

  socket.on('new message', data => {
    console.log(`New message from user ${data.user}: "${data.message}"`);
    if (messages.length >= MAX_MESSAGES) {
      messages.shift();
    }
    messages.push({user: data.user, message: data.message});
    ioServer.emit('messages', messages);
  });

  socket.on("disconnect", () => {
    if (socket.userName) {
      users = users.filter(user => user !== socket.userName);
      console.log(`User "${socket.userName}" disconected.`);
      ioServer.emit('users', users);
    }
  });
});
