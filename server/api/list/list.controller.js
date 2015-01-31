'use strict'


var List = require('./list.model')

exports.show = function (req, res, next) {
  var listId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};