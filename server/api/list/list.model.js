'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
  name: String,
  icon: String,
  description: String,
  gifts: [{type: Schema.Types.ObjectId, ref: 'Gift'}],
  lastModified: Date,
  deadline: Date,
});

module.exports = ListSchema;
