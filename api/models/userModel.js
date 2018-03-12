'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Please, enter the name'
  },
  email: {
    type: String,
    required: 'Please, enter the email'
  },
  password: {
    type: String,
    required: 'Please, enter the password'
  },
  state: {
    type: String,
    required: 'Please, enter the state name'
  }
});

module.exports = mongoose.model('Users', UserSchema);
