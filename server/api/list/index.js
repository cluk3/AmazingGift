 'use strict';

var express = require('express');
var controller = require('./list.controller');
var auth = require('../../auth/auth.service');
var authorize = require('../../auth/authorization.service');
var router = express.Router();


router.route('/:user/lists')
  .get(auth.isAuthenticated(),authorize.isFriend, function(req,res) {
    console.log(req.params.user);
    res.send("Hello Router!");
  })
/*
.post(auth.isAuthenticated(),authorize.isUser,controller.create)

router.route('/:user/lists/:id')
.delete(controller.destroy);
.get(controller.show);
.put(controller.update);
*/

module.exports = router;