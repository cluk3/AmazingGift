'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
  name: {type: String, required: true},
  icon: String,
  description: String,
  restid: {type: String, required: true},
  gifts: [{type: Schema.Types.ObjectId, ref: 'Gift'}],
  lastModified: Date,
  deadline: Date,
});

module.exports = ListSchema;