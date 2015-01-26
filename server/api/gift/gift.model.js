'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GiftSchema = new Schema({
  name: String,
  description: String,
  active: Boolean,
  given: Boolean,
  givenAt: Date,
  surprise: Boolean,
  openView: Boolean,
  lastModified: Date,
  purchased: Date,
  purchasedAt: Date,
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  managers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  payers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  userFeedback: { comment: String, vote: Number},
  deadline: Date,
  list: Schema.Types.ObjectId
});

module.exports = mongoose.model('Gift', ThingSchema);
