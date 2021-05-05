const io = require('socket.io-client');
const repl = require('repl');
const mongoose = require('mongoose');
const base64 = require('base-64');
const chalk = require('chalk')
const readline = require('readline');
const basicAuth = require('./basicAuth.js')
const Account = require('./accounts.js')
const Mongoose = require('./mongoose.js')
// const basicAuth = require('basicAuth')

let playerName;

const host = 'http://localhost:3333';
const socket = io.connect(host);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question("Welcome to CLI-64 \n 1) Existing User \n 2) Create New User \n", (payload) => {
      // Existing User
      if (payload === '1') {
        rl.question("Enter your username with 'username:password' format.", async (accountInfo) => {
          let userInformation = base64.encode(accountInfo)
          let accountVerification = await basicAuth(`Basic ${userInformation}`)
          if (!accountVerification) {
            rl.close();
          } else {
            playerName = accountVerification.username
            console.log(`Welcome ${accountVerification.username}!`)
            socket.emit('newPlayer', accountVerification.username)
          }
          resolve()
        })
        // Create New User
      } else if (payload === '2') {
        // Takes username and hashes password and stores in database
        rl.question("Create a new account with the following format 'username:password '\n", async (accountInfo) => {

          let [username, password] = accountInfo.split(':')
          let user = {
            username: username,
            password: password
          }
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
              })
            }
            resolve()
          })
        })
      }
    });
  })
}

const chooseGame = () => {
  return new Promise((resolve, reject) => {
    rl.question("Which game do you want to play? ", (payload) => {
      let roomData = {
        gameChoice: payload,
        playerName: playerName
      }
      if (payload === 'hangman') {
        // stop readline here
        // start repl 
        rl.close()
        repl.start({
          prompt: ``,
          eval: (text) => {
            // emits message events
            socket.send(text)
          },
        })
        socket.emit('enterHang', roomData)
        socket.on('hello', joinedRoom)

        resolve()
      } else if (payload === 'typeracer') {
        socket.emit('enterType', roomData)
        socket.on('hello', joinedRoom)
        resolve()
      }
    })
  })
}
const main = async () => {
  await question1()
  await chooseGame()
}

main()

// socket.on('play', playHandler)

// socket.on('joined', payload => {
//   console.log(`${payload} has been succesffully connected to CLI-64!`)
// })

function playHandler(payload) {
  console.log(payload)
  //read line
  rl.question("", (payload) => {
    socket.emit('message', payload)
  })
}

function joinedRoom(payload) {
  console.log(payload)
}


rl.on("close", () => {

});
// repl.start({
//   prompt: ``,
//   eval: (text) => {
//     process.stdout.write('\u001b[1F');
//     socket.send({text, username})
//   },
// })