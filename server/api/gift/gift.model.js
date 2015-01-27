'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var visible = ['public', 'friends', 'private'];

var GiftSchema = new Schema({
  name:{ type: String, required: true},
  description: String,
  active: {type: Boolean, default: true},
  given: {type: Boolean, default: false},
  givenAt: Date,
  surprise: {type: Boolean, required: true},
  visibility: {type: String, default: "friends", enum: visible},
  lastModified: {type: Date, default: Date.now},
  purchased: { type: Boolean, default: false},
  purchasedAt: Date,
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  managers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  payers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  userFeedback: { comment: String, vote: Number},
  deadline: Date,
  list: Schema.Types.ObjectId
});

module.exports = mongoose.model('Gift', GiftSchema);
