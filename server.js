const express = require('express');
const http = require('http');
// const socketIO = require('socket.io');
const cors  = require('cors')

const app = express();
const server = http.createServer(app);


const io = require('socket.io')(server, {cors: {origin: "*"}});

io.on('connection', (socket) => {
  console.log('User connected');

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    console.log('chat message--->', msg)
    io.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
