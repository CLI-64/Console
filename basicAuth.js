'use strict';

const base64 = require('base-64');
const users = require('accounts.js');

module.exports = (userInfo) => {

  if (!userInfo) {
    console.log('INVALID USER INFORMATION');
  }
  let basic = userInfo.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  try {
    let currentUser = await users.authenticateBasic(user, pass);
    return currentUser;
  } catch (e) {
    console.log(e)
  }
}