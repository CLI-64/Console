require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

// Database Connection
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// };

// mongoose.connect('mongodb://localhost:27017/cliaccounts', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// })
//   .then((data) => {
//     console.log(data)
//     console.log('THIS IS CONNECTED TO MONGO')
//   })

// const account = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// });

// let newAccount = mongoose.model('accounts', account)

// const Player = require('./player.js')
// creates new namespace

console.log('HUB UP AND RUNNING...')

// io is the main socket
io.on('connection', (socket) => {
  console.log(`${socket.id} HAS CONNECTED`)
  logger(payload);

  socket.on('enterType', (payload) => {
    // whoever file emits this listener, joins the channel they pass as an argument
    socket.join(payload)
    io.to('typeracer').emit('hello', 'HELLO WORLD, TYPERACER GAME')
  });
  // io.to('typeracer').emit('play', payload)
  // io.to('typeracer').on('play', payload)

  socket.on('enterHang', (payload) => {
    // whoever file emits this listener, joins the channel they pass as an argument
    socket.join(payload) // socket.join('hangman') 
    io.to('hangman').emit('hello', 'HELLO WORLD, HANGMAN GAME')
    logger(payload);
  });

  function logger(payload) {
    console.log({ payload }),

      next();
  };

  module.exports = logger;

  // io.to('hangman').emit('play', payload)
  // io.to('hangman').on('play', payload)
})


// socket.on('login', (payload) => {
//   Authenticates

//   let user = login(payload)
//   while(!user){
//     user = login(payload)
//   }
//   console.log(`Welcome Back ${username}`)
// })


// io.on('login', (payload) => {
//   // Authenticates
//   let user = login(payload)
//   while(!user){
//     user = login(payload)
//   }
//   console.log(`Welcome Back ${username}`)
// })

// module.exports = newAccount;