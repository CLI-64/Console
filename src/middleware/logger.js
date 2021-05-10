'use strict';

// All middleware has access to the request.
// Here, we're simply logging out the interesting parts
function logger(payload) {
  console.log({ payload, next }),

    next();
};

module.exports = logger;