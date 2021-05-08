'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const account = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

account.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
})


account.statics.authenticateBasic = async function (username, password) {
  // search DB with username to retrieve data
  const user = await this.findOne({ username });
  // compare the decoded password with encrypted password
  const valid = await bcrypt.compare(password, user.password);
  if (valid) { return user; }
  throw new Error();
}

module.exports = mongoose.model('accounts', account)

