const io = require('socket.io-client');
const repl = require('repl');
const base64 = require('base-64');
const chalk = require('chalk')
const readline = require('readline');
// const Account = require('accounts.js')
// const basicAuth = require('basicAuth')

const host = 'http://localhost:3000';
const socket = io.connect(host);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// socket.on('connect', () => {
//   console.log('Connected to CHATROOM');

  // Prompt for 1 ) 'Existing User' or 2 ) 'Create new user'
  rl.question("Welcome to CLI-64 \n 1) Existing User \n 2) Create New User", (payload) => {
    // Existing User
    if (payload === 1) {
      rl.question("Enter your username with 'username:password' format.", (accountInfo) => {
        // Puts through Auth function to verify in database
        // SUCCESSFUL
        if (userData) {
        }
      });
      // Create New User
    } else if (payload === 2) {
      // Takes username and hashes password and stores in database
      let account = new Account(accountInfo)
      account.save()
        .then(newUser => {
          console.log(`Account ${newUser} successfully created`)
        })
      rl.question("Enter your username with 'username:password' format.", (accountInfo) => {
        let userInformation = base64.encode(accountInfo)
        basicAuth(userInformation)
      })
    } else {
      console.log('error')
    }
  });
})


rl.question("Which game do you want to play? ", (payload) => {
  if (payload === 'hangman') {
    socket.emit('enterHang', 'hangman')
    socket.on('hello', joinedRoom)
  } else if (payload === 'typeracer') {
    socket.emit('enterType', 'typeracer')
    socket.on('hello', joinedRoom)
  }
})

rl.question("What is your username? ", (payload) => {
  socket.emit('login', payload)
})

function joinedRoom(payload){
  console.log(payload)
}