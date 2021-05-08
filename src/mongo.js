'use strict';

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(MONGODB_URI, options)
