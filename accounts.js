
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const accounts = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { toJSON: { virtuals: true } });

accounts.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
})

accounts.statics.authenticateBasic = async function (username, password) {
  // search DB with username to retrieve data
  const user = await this.findOne({ username });
  // compare the decoded password with encrypted password
  const valid = await bcrypt.compare(password, user.password);
  if (valid) { return user; }
  throw new Error('THIS IS WHAT TRIGGERS ERROR FOR CATCH STATEMENT');
}

module.exports = mongoose.model('accounts', accounts)

