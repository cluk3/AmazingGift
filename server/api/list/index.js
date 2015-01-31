'use strict';

var express = require('express');
var controller = require('./list.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.all('/:user/lists/*', auth.isAuthenticated());

router.route('/:user/lists')
  .get( function(req,res) {
    console.log(req.params.user);
    res.send("Hello Router!");
  })
/*
.post(controller.create)

router.route('/:user/lists/:id')
.delete(controller.destroy);
.get(controller.show);
.put(controller.update);
*/

module.exports = router;