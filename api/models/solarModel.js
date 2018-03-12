'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SolarSchema = new Schema({
  DataProvider: {
    type: String,
    required: 'Please, enter the Data Provider'
  },
  InstallationDate: {
    type: String,
    required: 'Please, enter the Installation Date'
  },
  SystemSize: {
    type: String,
    required: 'Please, enter the System Size'
  },
  ZipCode: {
    type: String,
    required: 'Please, enter the Zip Code'
  },
  State: {
    type: String,
    required: 'Please, enter the State'
  },
  Cost: {
    type: String,
    required: 'Please, enter the Cost'
  }
});

module.exports = mongoose.model('Solar', SolarSchema);
