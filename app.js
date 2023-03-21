const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:3000']
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (msg) => {
    // console.log(msg);
    socket.emit('message-broadcast', msg);
  });
  // socket.on('my message', (msg) => {
  //   io.emit('my broadcast', `server: ${msg}`);
  // });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});