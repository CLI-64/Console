'use strict';


require('dotenv').config();
// required for MongoDB
const mongoose = require('mongoose');
const server = require('../server.js');
const PORT = process.env.PORT || 3000

// connect to mongo db and start server
const MONGODB_URI = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(MONGODB_URI, options)
  .then(() => {
    server.start(PORT)
  })
  .catch(err => console.error(err.message))