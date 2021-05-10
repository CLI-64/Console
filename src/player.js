const io = require('socket.io-client');
const repl = require('repl');
const mongoose = require('mongoose');
const base64 = require('base-64');
const chalk = require('chalk')
const readline = require('readline');
const Account = require('./mongoose.js')
// const basicAuth = require('basicAuth')

const host = 'http://localhost:3333';
const socket = io.connect(host);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// socket.on('connect', () => {
//   console.log('Connected to CHATROOM');

// Prompt for 1 ) 'Existing User' or 2 ) 'Create new user'
rl.question("Welcome to CLI-64 \n 1) Existing User \n 2) Create New User \n", (payload) => {
  // Existing User
  if (payload === '1') {
    rl.question("Enter your username with 'username:password' format.", (accountInfo) => {
      let userInformation = base64.encode(accountInfo)
      basicAuth(userInformation)
    })

    // Create New User
  } else if (payload === '2') {
    // Takes username and hashes password and stores in database
    rl.question("Create a new account with the following format 'username:password '\n", (accountInfo) => {

      let [username, password] = accountInfo.split(':')
      let user = {
        username: username,
        password: password
      }
      const account = new Account(user)
      account.save()
        .then(data => {
          console.log(data)
        })
    })


    // SIGN IN AFTER CREATING NEW USER
    rl.question("Enter your username with 'username:password' format.", (accountInfo) => {
      let userInformation = `Basic ${base64.encode(accountInfo)}`
      basicAuth(userInformation)
    })
  } else {
    console.log('error')
  }
});


rl.question("Which game do you want to play? ", (payload) => {
  if (payload === 'hangman') {
    socket.emit('enterHang', 'hangman')
    socket.on('hello', joinedRoom)
  } else if (payload === 'typeracer') {
    socket.emit('enterType', 'typeracer')
    socket.on('hello', joinedRoom)
  }
})

function joinedRoom(payload) {
  console.log(payload)
}