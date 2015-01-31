'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestIdSchema = new Schema({
  resource: {type: String, unique: true, required: true},
  count: {type: Number, required: true, default: 0}
});

module.exports = mongoose.model('RestId', RestIdSchema);