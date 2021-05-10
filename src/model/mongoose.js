'use strict'

require('dotenv').config();
let MONGODB_URI = process.env.MONGODB_URI
const mongoose = require('mongoose')
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

mongoose.connect(MONGODB_URI, options)