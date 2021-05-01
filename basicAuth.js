'use strict';

const base64 = require('base-64');
const users = require('accounts.js');

module.exports = (userInfo) => {
  // username and pw not passed through headers
  // console.log('req.headers', req.headers)
  if (!userInfo) {
    next('Sorry, you are not authorized');
  }
  let basic = userInfo.split(' '). pop();
  let [user, pass] = base64.decode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(user, pass);
    next();
  } catch (e) {
    res.status(403).json({
      status: 403,
      message: 'Login does not exist'
    })
  }
}