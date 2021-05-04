const mongoose = require('mongoose')
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose.connect('mongodb://localhost:27017/cliaccounts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const account = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

let newAccount = mongoose.model('accounts', account)

module.exports = newAccount;