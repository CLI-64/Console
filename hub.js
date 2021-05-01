require('dotenv').config();
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

// Database Connection
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const options = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
};
mongoose.connect(MONGODB_URI, options)

// const Player = require('./player.js')
// creates new namespace

console.log('HUB UP AND RUNNING...')

// io is the main socket
io.on('connection', (socket) => {
  console.log(`${socket.id} HAS CONNECTED`)

  socket.on('enterType', (payload) => {
    // whoever file emits this listener, joins the channel they pass as an argument
    socket.join(payload)
    io.to('typeracer').emit('hello', 'HELLO WORLD, TYPERACER GAME')
  })
  // io.to('typeracer').emit('play', payload)
  // io.to('typeracer').on('play', payload)

  socket.on('enterHang', (payload) => {
    // whoever file emits this listener, joins the channel they pass as an argument
    socket.join(payload) // socket.join('hangman') 
    io.to('hangman').emit('hello', 'HELLO WORLD, HANGMAN GAME')
  })

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

