'use strict';

const base64 = require('base-64');
const account = require('../model/accounts.js');

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