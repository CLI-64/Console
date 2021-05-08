'use strict';

const Account = require('../src/middleware/accounts.js')
const mongoose = require('mongoose');

const user = {
  username: 'jenner',
  password: 'rennej'
}
const account = new Account(user)
console.log('this is Account', account)
account.save()
  .then(data => {
    console.log(data)
  })