const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const login = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("Welcome to CLI-64 \n 1) Existing User \n 2) Create New User \n", (payload) => {
//       if (payload === '1') {
//         existingUser()
//       } else if (payload === '2') {
//         createUser()
//       }
//       rl.question("Enter your username", (accountInfo) => {
//         rl.question("Enter your birth month", (month) => {

//           console.log(payload, accountInfo, month)
//           resolve()
//         })
//       })
//     })
//   })
// }

// const createUser = () => {
//   rl.question("Create a new account with the following format 'username:password '\n", (accountInfo) => {

//     let [username, password] = accountInfo.split(':')
//     let user = {
//       username: username,
//       password: password
//     }
//     const account = new Account(user)
//     account.save()
//       .then(data => {
//         console.log(data)
//       })
//   })
// }

// const existingUser = () => {
//   return new Promise((resolve, reject) => {

//   }
// }

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
            console.log(`Welcome ${accountVerification.username}!`)
          }
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
        rl.question("Enter your username with 'username:password' format.", async (accountInfo) => {
          let userInformation = base64.encode(accountInfo)
          let accountVerification = await basicAuth(`Basic ${userInformation}`)
          if (!accountVerification) {
            rlclose();
          } else {
            console.log(`Welcome ${accountVerification.username}!`)
          }
        })
      }
    });
    resolve()
  })
}

const chooseGame = () => {
  return new Promise((resolve, reject) => {
    rl.question("Which game do you want to play? ", (payload) => {
      if (payload === 'hangman') {
        socket.emit('enterHang', 'hangman')
        socket.on('hello', joinedRoom)
      } else if (payload === 'typeracer') {
        socket.emit('enterType', 'typeracer')
        socket.on('hello', joinedRoom)
      }
    })
    resolve()
  })
}
const main = async () => {
  await question1()
  await chooseGame()
  rl.close()
}

main()








// const chooseGame = () => {
//   return new Promise((resolve, reject) => {
//     rl4.question("Which game do you want to play? ", (payload) => {
//       if (payload === 'hangman') {
//         socket.emit('enterHang', 'hangman')
//         socket.on('hello', joinedRoom)
//       } else if (payload === 'typeracer') {
//         socket.emit('enterType', 'typeracer')
//         socket.on('hello', joinedRoom)
//       }
//     })
//   })
// }


// const question2 = () => {
//   return new Promise((resolve, reject) => {
//     rl.question("What is your favorite food", (payload) => {
//       resolve()
//     })
//   })
// }







// ==============================================
// const question1 = () => {
//   return new Promise((resolve, reject) => {

//     rl.question("Enter first Number", (payload) => {
//       rl.question("Enter your username", (accountInfo) => {
//         rl.question("Enter your birth month", (month) => {


//           resolve()
//         })
//       })
//     })
//   })
// }

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question("Favorit food", (payload) => {

      resolve()
      return payload
    })
  })
}

// sushi

// const main = async () => {
//   let values = await question1()
//   console.log('\n', values)

//   let data = await question2()
//   console.log('favorite food is', data)
//   rl.close()
// }

// main()




