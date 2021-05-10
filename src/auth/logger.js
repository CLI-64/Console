'use strict';

const logger = (EVENT, payload) => {
  let time = new Date();
  console.log({ EVENT, time, payload });
  next();
}

module.exports = logger;