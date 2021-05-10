'use strict';

require('@code-fellows/supergoose');
const accounts = require('../src/model/accounts.js');
// const { italic } = require('chalk');
// const mongoose = require('mongoose');

const user = {
  username: 'jenner',
  password: 'rennej'
};

const account = new accounts();

beforeAll(async (done) => {
  await new account(user).save();
  done();
});

describe('test if a user', () => {

  it('checks if valid user', async () => {
    // expect(user).toBeTruthy();
    let players = accounts(user);
    expect(players).toEqual({ username: 'jenner', password: 'rennej' });
  });

});
