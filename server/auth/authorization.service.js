'use strict';

var User = require('../api/user/user.model');

exports.isUser = function (req,res,next) {
  if(req.user.restid === req.params.user) return next();
  res.send(403);
}

exports.isFriend = function (req, res, next) {

  // if user is requesting his own page --> next
  if(req.user.restid === req.params.user) {
    req.isFriend = false;
    return next();
  }
  // Else check if he is requesting a friend page
  User.findOne({restid: req.params.user},function (err, user) {
    if(err) throw err;
    if(!user) return res.send(404);
    if(user.friends.indexOf(req.user._id) !== -1) {
      req.isFriend = true;
      req.requestedUser = user;
      return next();
    }
    res.send(403);
  });
}