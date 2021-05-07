const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.stdoutMuted = true;

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question("Enter Username: ", (username) => {
        rl.query = "Enter Password: ";
        rl.question(rl.query, (password) => {

        let user = `${username}:${password}`
        console.log(`\n${user}`)
      })
      rl._writeToOutput = (stringToWrite) => {
        if (rl.stdoutMuted)
          rl.output.write("*");
        else
          rl.output.write(stringToWrite);
      };
    })
  })
}

question1()