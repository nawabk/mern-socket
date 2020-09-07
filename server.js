const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

const myEmitter = require('./utils/MyEmitter');

dotenv.config({ path: './config.env' });
const app = require('./app');

const server = http.createServer(app);
const io = socketIo(server);

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connection successfull'));

const map = new Map();

io.on('connection', socket => {
  socket.on('newUserConnection', userId => {
    map.set(userId, socket);
  });
});

myEmitter.on('notify', (userId, notification) => {
  if (typeof userId === 'object') {
    userId = userId.toString();
  }
  if (map.has(userId)) {
    map.get(userId).emit('notification', notification);
  }
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
