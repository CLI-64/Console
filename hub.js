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
    socket.broadcast.emit('newPlayer', payload)
  })

  // Alerts when new cartridge has been inserted
  socket.on('insert cartridge', () => {
    socket.broadcast.emit('insert cartridge')
  })

 
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

  socket.on('disconnect', payload => {
    socket.emit('clear', 'x')
    socket.broadcast.emit('clear', 'x')
  })
})