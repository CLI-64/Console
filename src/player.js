
const repl = require('repl');
const mongoose = require('mongoose');
const base64 = require('base-64');
const chalk = require('chalk')
const readline = require('readline');
const basicAuth = require('./auth/basicAuth.js')
const Account = require('./model/accounts.js')
const Mongoose = require('./model/mongoose.js')
const io = require('socket.io-client');
const host = 'http://localhost:3333';
// const host = 'http://4eaf322577d9.ngrok.io';
const socket = io.connect(host);

let playerName;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.stdoutMuted = true;

const question1 = () => {
  return new Promise((resolve, reject) => {
    clearScreen();
    rl.question("Welcome to CLI-64 \n 1) Existing User \n 2) Create New User \n", async (payload) => {
      // Existing User
      if (payload === '1') {
        rl.question("Enter Username: ", (username) => {
          rl.query = "Enter Password: ";
          rl.question(rl.query, async (password) => {
            let user = `${username}:${password}`
            let userInformation = base64.encode(user)
            let accountVerification = await basicAuth(`Basic ${userInformation}`)
            if (!accountVerification) {
              console.log('Account does not exist.. Try Again..')
              process.exit(0);
            } else {
              // Sets the username to playerName
              playerName = accountVerification.username
              clearScreen();
              console.log('Connected to CLI-64');
              console.log(`\nWelcome ${accountVerification.username}! Type to verify your connection`)
              rl.close()
              socket.on('connect', () => {
                // make new player
                socket.emit('newPlayer', accountVerification.username)
              })
            }
            resolve()
          })
          rl._writeToOutput = (stringToWrite) => {
            if (rl.stdoutMuted) {
              rl.output.write("*");
            } else {
              rl.output.write(stringToWrite);
            }
          }
        })
        // Create New User
      } else if (payload === '2') {
        // Takes username and hashes password and stores in database
        rl.question("Create a new account\nUsername: ", async (username) => {
          try {
            rl.query = "Enter Password: ";
            rl.question(rl.query, async (password) => {
              let account = await new Account({
                username: username,
                password: password
              })
              let newUser = account.save()
              console.log(`Account successfully created!`)
              rl.question("Enter Username: ", (username) => {
                rl.query = "Enter Password: ";
                rl.question(rl.query, async (password) => {
                  let user = `${username}:${password}`
                  let userInformation = base64.encode(user)
                  let accountVerification = await basicAuth(`Basic ${userInformation}`)
                  if (!accountVerification) {
                    process.exit(0);
                  } else {
                    // Sets the username to playerName
                    playerName = accountVerification.username
                    clearScreen();
                    console.log('Connected to CLI-64');
                    console.log(`\nWelcome ${accountVerification.username}! Type to verify your connection`)
                    rl.close()
                    socket.on('connect', () => {
                      // make new player
                      socket.emit('newPlayer', accountVerification.username)
                    })
                  }
                  resolve()
                })
                rl._writeToOutput = (stringToWrite) => {
                  if (rl.stdoutMuted) {
                    rl.output.write("*");
                  } else {
                    rl.output.write(stringToWrite);
                  }
                }
              })
            })
          } catch (e) {
            console.log(e)
          }
        })
      }
    })
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

function clearScreen() {
  process.stdout.write('\x1B[2J');
}

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


