'use strict';

const io = require('socket.io-client');
const host = 'http://ffe9dcd3e88b.ngrok.io';
const repl = require('repl');
const chalk = require('chalk')
const socket = io.connect(host);
let currentSentence;
const sentences = [
  `Tom threw Tim three thumbtacks`,
  `He threw three free throws`,
  `So, this is the sushi chef`,
  `Eddie edited it`,
  `I saw a kitten eating chicken in the kitchen`,
  `Can you can a can as a canner can can a can?`,
  `You know New York, you need New York, you know you need unique New York`,
  `I saw a kitten eating chicken in the kitchen`,
  `If a dog chews shoes, whose shoes does he choose?`,
  `I thought I thought of thinking of thanking you`,
  `I wish to wash my Irish wristwatch`,
  `Fred fed Ted bread, and Ted fed Fred bread`,
  `I fitted the sheet, the sheet I sheets, and on the fitted sheet I sit`,
  `A skunk sat on a stump and thunk the stump stunk, but the stump thunk the skunk stunk`,
  `Lesser leather never weathered wetter weather better`,
]

socket.on('runGame', payload => {
  typeracer.startGame(payload, sentence)
})

let sentence;
// after pressing enter
socket.on('message', payload => {
  // check player current players
  if (payload.text.split('\n')[0] === 'data') {
    console.log(players)
  }

  // socket.broadcast.emit('message', payload)
  socket.emit('play', payload)
  // If the players entry matches the current sentence
  if (payload.text.split('\n')[0] === players[payload.username].sentence) {
    // stop game and display winner
    winner.push('Someone won')
    if (winner.length === 1) {
      // reset sentence
      currentSentence = sentences[Math.floor(Math.random() * sentences.length)]
      Object.keys(players).forEach(value => {
        players[value].sentence = currentSentence;
      })
      // increment score
      players[payload.username].score++
      socket.broadcast.emit('round', payload)
      socket.emit('round', payload)
      if (players[payload.username].score === 3) {
        socket.broadcast.emit('winner', payload)
        socket.emit('winner', payload)
        winner.pop()
      } else {
        // reset
        winner.pop()
        // Might have to pass in the socket...
        nextQuestion(socket, currentSentence)
      }
    }
  }
})

socket.on('runGame', payload => {
  // start game with random sentence
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)]
  Object.keys(players).forEach(value => {
    players[value].sentence = currentSentence;
  })
  startGame(socket, currentSentence);
})

// new player joins game
function startGame(socket, sentence) {
  // resets the scores
  Object.keys(players).forEach(value => {
    players[value].score = 0;
  })

  socket.broadcast.emit('play')
  socket.emit('play')
  setTimeout(() => {
    socket.broadcast.emit('countdown', '3')
    socket.emit('countdown', '3')
  }, 1000)
  setTimeout(() => {
    socket.broadcast.emit('countdown', '2')
    socket.emit('countdown', '2')
  }, 2000)
  setTimeout(() => {
    socket.broadcast.emit('countdown', '1')
    socket.emit('countdown', '1')
  }, 3000)
  setTimeout(() => {
    socket.broadcast.emit('countdown', '===========================')
    socket.emit('countdown', '===========================')
    socket.broadcast.emit('countdown', sentence)
    socket.emit('countdown', sentence)
    socket.broadcast.emit('countdown', '===========================')
    socket.emit('countdown', '===========================')
  }, 4000)
}

function nextQuestion(socket, sentence) {
  setTimeout(() => {
    socket.broadcast.emit('clear')
    socket.emit('clear')
  }, 3000)

  socket.broadcast.emit('countdown', '===========================')
  socket.broadcast.emit('countdown', 'GET READY FOR THE NEXT ROUND...')
  socket.broadcast.emit('countdown', '===========================')
  socket.emit('countdown', '===========================')
  socket.emit('countdown', 'GET READY FOR THE NEXT ROUND...')
  socket.emit('countdown', '===========================')
  setTimeout(() => {
    socket.broadcast.emit('countdown', '3')
    socket.emit('countdown', '3')
  }, 4000)
  setTimeout(() => {
    socket.broadcast.emit('countdown', '2')
    socket.emit('countdown', '2')
  }, 5000)
  setTimeout(() => {
    socket.broadcast.emit('countdown', '1')
    socket.emit('countdown', '1')
  }, 6000)
  setTimeout(() => {
    socket.broadcast.emit('countdown', '===========================')
    socket.broadcast.emit('countdown', sentence)
    socket.broadcast.emit('countdown', '===========================')
    socket.emit('countdown', '===========================')
    socket.emit('countdown', sentence)
    socket.emit('countdown', '===========================')
  }, 7000)
}


module.exports = {
  startGame: startGame,
  nextQuestion: nextQuestion
}