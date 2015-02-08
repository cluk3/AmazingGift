 'use strict';

var express = require('express');
var controller = require('./list.controller');
var auth = require('../../auth/auth.service');
var authorize = require('../../auth/authorization.service');
var router = express.Router();


router.route('/:user/lists')
  .get(auth.isAuthenticated(), authorize.isFriend, controller.index)
  .post(auth.isAuthenticated(), authorize.isUser, controller.create);

/*
router.route('/:user/lists/:id')
  .delete(auth.isAuthenticated(), authorize.isUser, controller.destroy);
  .get(auth.isAuthenticated(), authorize.isFriend, controller.show);
  .put(auth.isAuthenticated(), authorize.isUser, controller.update);
*/

module.exports = router;