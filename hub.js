require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);
const Player = require('./newplayer.js')
const Account = require('./accounts.js')
const Mongoose = require('./mongoose.js')
const players = {
  // this is where players are listed
}

// const Player = require('./player.js')
// creates new namespace

console.log('HUB UP AND RUNNING...')

io.on('connection', (socket) => {
  console.log(`${socket.id} HAS CONNECTED`)

  // Add new player
  socket.on('newPlayer', payload => {
    socket.broadcast.emit('joined', payload)
    socket.emit('joined', payload)
    // adds new player
    players[payload] = new Player(payload)
    console.log(players)
  })

  socket.on('enterType', (payload) => {
    // Join TypeRacer room
    socket.join(payload)
    io.to('typeracer').emit('hello', `${payload.playerName} has joined the TypeRacer Room`)
  })
  // io.to('typeracer').emit('play', payload)
  // io.to('typeracer').on('play', payload)

  socket.on('enterHang', (payload) => {
    // whoever file emits this listener, joins the channel they pass as an argument
    socket.join(payload.gameChoice) // socket.join('hangman') 
    io.to('hangman').emit('hello', `${payload.playerName} has joined the Hangman Room`)
  })
  // io.to('hangman').emit('play', payload)
  // io.to('hangman').on('play', payload)

  socket.on('message', payload => {
    console.log(payload)
  })
})

// io.on('login', (payload) => {
//   // Authenticates
//   let user = login(payload)
//   while(!user){
//     user = login(payload)
//   }
//   console.log(`Welcome Back ${username}`)
// })
