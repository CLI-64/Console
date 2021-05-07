const io = require('socket.io-client');
const repl = require('repl');
const base64 = require('base-64');
const chalk = require('chalk')
const readline = require('readline');
const Account = require('./accounts.js')
// const basicAuth = require('basicAuth')

const host = 'http://localhost:3000';
const socket = io.connect(host);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.stdoutMuted = true;

// socket.on('connect', () => {
//   console.log('Connected to CHATROOM');

// Prompt for 1 ) 'Existing User' or 2 ) 'Create new user'
rl.question("Welcome to CLI-64 \n 1) Existing User \n 2) Create New User \n", async (payload) => {
  // Existing User
  if (payload === '1') {
    _existingUser()
    // Create New User
  } else if (payload === '2') {
    // Takes username and hashes password and stores in database
    rl.question("Create a new account\nUsername: ", async (username) => {
      try {
        rl.query = "Enter Password: ";
        rl.question(rl.query, async (password) => {
          let account = await new Account({
            'username': username,
            'password': password
          })          
          console.log('this is Account', account)
          let newUser = await account.save()
          console.log(`Account ${newUser} successfully created`)
        })
        rl._writeToOutput = (stringToWrite) => {
          if (rl.stdoutMuted)
            rl.output.write("*");
          else
            rl.output.write(stringToWrite);
        };
      } catch (e) {
        console.log(e)
      }
    })
    // SIGN IN AFTER CREATING NEW USER
    _existingUser()
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

function _existingUser() {
  rl.question("Enter Username: ", (username) => {
    rl.query = "Enter Password: ";
    rl.question(rl.query, (password) => {

      let user = `${username}:${password}`
      console.log(`\n${user}`)

      let userInformation = base64.encode(user)
      basicAuth(userInformation)
    })
    rl._writeToOutput = (stringToWrite) => {
      if (rl.stdoutMuted)
        rl.output.write("*");
      else
        rl.output.write(stringToWrite);
    };
  })
}