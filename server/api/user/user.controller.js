'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var restId = require('../restId/restId.model');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    console.dir(user);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res) {
  var userId = req.params.id;

  User.findOne({restid: userId},'-salt -hashedPassword', function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);
    res.json(user);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findOneAndRemove({restid: req.params.id}, function(err, user) {
    if(err) return res.send(500, err);
    if(!user) return res.send(404);
    return res.send(204);
  });
};

/**
 * Change a users password
*/
exports.changePassword = function(req, res) {
  var user = req.user;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  if(user.authenticate(oldPass)) {
    user.password = newPass;
    user.save(function(err) {
      if (err) return validationError(res, err);
     res.send(200);
  });
    } else {
      res.send(403);
    }
};

/**
 * Updates a user info
 */

exports.update = function(req, res) {
  var user = req.user;

  console.log(req.body);

  User.findById(user._id, function(err, updUser) {
    if (err) return validationError(res, err);

    if(req.body.email)
      updUser.email = req.body.email;

    if(req.body.birthdate)
      updUser.birthdate = req.body.birthdate;

    if(req.body.name) {
      updUser.name.first = req.body.name.first || updUser.name.first;
      updUser.name.last = req.body.name.last || updUser.name.last;
      var fullname = updUser.name.first + updUser.name.last;
      restId.findOneAndUpdate({"resource": fullname},{$inc: {count: 1}},
        {upsert: true, new: true}, function (err, updated) {
          if(err) next(err);
          updUser.restid = (updated.count === 1) ? updated.resource : (  updated.resource+updated.count);
          updUser.save(function(err) {
            if (err) return validationError(res, err);
            res.send(200);
          });
        });
    } else {
      updUser.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    }

  });
};

/**
 * Get my info
 */

 exports.me = function(req, res) {
  var user = req.user;
    res.json({
      _id: user._id,
      restid: user.restid,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      role: user.role,
      provider: user.provider,
      friends: user.friends,
      lists: user.lists
    });
};

/*exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};
*/

/**
 * Authentication callback
 */
exports.authCallback = function(req, res) {
  res.redirect('/');
};
