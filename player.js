const io = require('socket.io-client');
const repl = require('repl');
const mongoose = require('mongoose');
const base64 = require('base-64');
const chalk = require('chalk')
const readline = require('readline');
const basicAuth = require('./basicAuth.js')
const Account = require('./accounts.js')
const Mongoose = require('./mongoose.js')
// import game

let playerName;

const host = 'http://localhost:3333';
const socket = io.connect(host);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question1 = () => {
  return new Promise((resolve, reject) => {
    // Login Choices
    rl.question("Welcome to CLI-64 \n 1) Existing User \n 2) Create New User \n", (payload) => {
      // Existing User
      if (payload === '1') {
        // Takes username and password, encodes and passes through basic authorization
        rl.question("Enter your username with 'username:password' format.", async (accountInfo) => {
          let userInformation = base64.encode(accountInfo)
          let accountVerification = await basicAuth(`Basic ${userInformation}`)
          if (!accountVerification) {
            // Exits the terminal if wrong information is passed
            rl.close();
          } else {
            // Sets the username to playerName
            playerName = accountVerification.username
            console.log(`Welcome ${accountVerification.username}!`)
            rl.close()
          }
          resolve()
        })
        // Create New User
      } else if (payload === '2') {
        // Takes username and hashes password and stores in database
        rl.question("Create a new account with the following format 'username:password '\n", async (accountInfo) => {
          // Put into correct format
          let [username, password] = accountInfo.split(':')
          let user = {
            username: username,
            password: password
          }
          // Adds user to the database
          const account = await new Account(user)
          account.save()
          rl.question("Enter your username with 'username:password' format.", async (accountInfo) => {
            let userInformation = base64.encode(accountInfo)
            let accountVerification = await basicAuth(`Basic ${userInformation}`)
            if (!accountVerification) {
              rl.close();
            } else {
              playerName = accountVerification.username
              console.log(`Welcome ${accountVerification.username}!`)
              socket.on('connect', () => {
                console.log('Connected to CHATROOM');
                // make new player
                socket.emit('newPlayer', accountVerification.username)
                rl.close()
              })
            }
            resolve()
          })
        })
      }
    });
  })
}

const main = async () => {
  await question1()
  repl.start({
    prompt: ``,
    eval: (text) => {
      // emits message events
      let userData = {
        text: text,
        playerName: playerName
      }
      process.stdout.write('\u001b[1F');
      socket.emit('play', userData)
    },
  })
}

main()

 // Information is passed back and forth from this socket
socket.on('play', payload => {
  if (payload.text) {
    const text = payload.text;
    const playerName = payload.playerName;
    console.log(chalk.green(`[${payload.playerName}] ${text.split('\n')[0]}`))
  } else {
    console.log(payload.split('\n')[0])
  }
})

socket.on('insert cartridge', () => {
  // Adds player to the list of players on the game
  // Allows players to be added on game insert and start
  socket.emit('newPlayer', playerName)
})

// Clears Console
socket.on('clear', payload => {
  process.stdout.write('\x1B[2J');
})

// Closes Readline in order to start REPL 
rl.on("close", () => {

});
