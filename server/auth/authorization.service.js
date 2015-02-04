'use strict';

var User = require('../api/user/user.model');

exports.isUser = function (req,res,next) {
  if(req.user.restid === req.params.user) return next();
  res.send(403);
}

exports.isFriend = function (req, res, next) {
  User.findOne({restid: req.params.user},function (err, user) {
    if(err) throw err;
    if(!user) return res.send(404);
    console.log(user.friends);
    if(user.friends.indexOf(req.user._id) !== -1) return next();
    res.send(403);
  });
}