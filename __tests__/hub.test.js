'use strict';

require('@code-fellows/supergoose');
// require('../src/hub.js')
const logger = require('../src/middleware/logger.js');


// Tested middleware needs to either be exported from the server or a separate module
describe('logger middleware', () => {

  let consoleSpy;
  let next = jest.fn(); // spy on next method

  beforeEach(() => {
    // Attach to the console (take it over)
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterAll(() => {
    // Put the console back
    consoleSpy.mockRestore();
  });

  it('checks console.logs', () => {
    logger(afterAll);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled()
    }, 11000)
  });

  it('middleware-logger', () => {
    logger(payload, next);
    // toHaveBeenCalled() is not enough, we need to make sure it was called with no args
    expect(next).toHaveBeenCalledWith();
  });

});

// describe('should test console log', () => {

//   it('checks console.logs', () => {
//     logger.on(afterAll);
//     setTimeout(() => {
//       expect(logSpy).toHaveBeenCalled()
//     }, 11000)
//   });

//   it('checks console.logs', () => {
//     logger.on(afterAll);
//     setTimeout(() => {
//       expect(logSpy).toHaveBeenCalled()
//     }, 11000)
//   });


// });