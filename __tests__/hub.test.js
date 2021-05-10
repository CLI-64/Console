'use strict';

require('@code-fellows/supergoose');
const logger = require('../src/auth/logger.js');

describe('logger', () => {

  let consoleSpy;

  beforeAll(async () => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterAll(async () => {
    consoleSpy.mockRestore();
  });


  it('checks console.logs', () => {
    logger.on(afterAll);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled()
    }, 11000)
  });

  it('checks console.logs', () => {
    logger.on(payload);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled()
    }, 11000)
  });

});