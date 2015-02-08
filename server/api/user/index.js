'use strict';

var express = require('express');
var controller = require('./user.controller');
//var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var listRouter = require('../list');
var router = express.Router();
var orOwner = true;

router.use('/',listRouter);

router.get('/', auth.isAuthenticated(), controller.index);
router.delete('/:id', auth.isAdminOrOwner(), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/me/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', auth.isAuthenticated(), auth.isOwner, controller.update);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
