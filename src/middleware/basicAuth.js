'use strict';

const base64 = require('base-64');
<<<<<<< HEAD:src/auth/basicAuth.js
const account = require('../model/accounts.js');
=======
const users = require('./accounts.js');
>>>>>>> 1490247d9d7bdc32c0fec30f24591b827ff0e58d:src/middleware/basicAuth.js

module.exports = async (userInfo) => {

  if (!userInfo) {
    console.log('INVALID USER INFORMATION');
  }
  let basic = userInfo.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  try {
    let currentUser = await account.authenticateBasic(user, pass);
    return currentUser;
  } catch (e) {
    console.log('\nWrong username or password.. Try Again..')
  }
}