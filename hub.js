require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);
const Account = require('./accounts.js')
const Mongoose = require('./mongoose.js')

console.log('HUB UP AND RUNNING...')

io.on('connection', (socket) => {
  console.log(`${socket.id} HAS CONNECTED`)

  // Add new player
  socket.on('newPlayer', payload => {
    console.log(`Within newPlayer even: payload = ${payload}`)
    socket.broadcast.emit('joined', payload)
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

  socket.on('play', payload => {
    socket.emit('play', payload)
    socket.broadcast.emit('play', payload)
    if(payload.text){
      if(payload.text.split('\n')[0] === 'start'){
        socket.broadcast.emit('runGame')
      } 
    }
  })

  socket.on('clear', payload => {
    socket.emit('clear', payload)
    socket.broadcast.emit('clear', payload)
  })
})