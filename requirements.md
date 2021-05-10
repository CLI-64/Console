# requirements

## Node Packages

- Within the root directory install the following packages
- npm i
  - base-64
  - bcrypt
  - chalk
  - dotenv
  - mongoose
  - readline
  - repl
  - socket.io
  - socket.io-client

## Mongoose Database

- A connection to a mongoose database and mongoose schema
- This is used to store account information

## .env file

- This file is used to hide pertinent such as mongooseDB URI and PORT

## Ngrok

- Ngrok establishes connection to outlying devices/computers
- The main user who runs the console should have ngrok. An URL will be then passed to other users to connect through the use of socket.io
