require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3333;
const io = require('socket.io')(PORT);
const Account = require('./src/model/accounts.js')
const Mongoose = require('./src/model/mongoose.js')

process.stdout.write('\x1B[2J');
console.log('CLI-64 Powered On...')

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

 // Route where messages are passed
  socket.on('play', payload => {
    socket.emit('play', payload)
    socket.broadcast.emit('play', payload)
    if(payload.text){
      if(payload.text.split('\n')[0] === 'start'){
        socket.broadcast.emit('runGame')
      } 
    }
  })

  // Clears players screen on event
  socket.on('clear', payload => {
    socket.emit('clear', payload)
    socket.broadcast.emit('clear', payload)
  })

  // Clears players screen when cartridge removed
  socket.on('disconnect', payload => {
    socket.emit('clear', 'x')
    socket.broadcast.emit('clear', 'x')
  })
})