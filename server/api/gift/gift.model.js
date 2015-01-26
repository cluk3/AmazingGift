'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GiftSchema = new Schema({
  name: String,
  description: String,
  active: Boolean,
  given: Boolean,
  surprise: Boolean,
  openView: Boolean,
  createdAt: Date,
  lastModified: Date,
  givenAt: Date,
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  managers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  payers: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model('Gift', ThingSchema);
