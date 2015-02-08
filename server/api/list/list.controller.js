'use strict'

var User = require('../user/user.model');
var List = require('./list.model');

exports.index = function (req, res) {
  var lists = req.isFriend ? req.requestedUser.lists : req.user.lists;
  res.json(200, lists);
};

exports.create = function(req, res) {
  var newList = req.body;
  User.findByIdAndUpdate(req.user._id, {$push: {lists: newList}}, function(err, updated) {
    if(err) throw err;
    res.send(201);
  })
}