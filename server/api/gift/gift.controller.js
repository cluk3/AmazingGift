/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /gifts              ->  index
 * POST    /gifts              ->  create
 * GET     /gifts/:id          ->  show
 * PUT     /gifts/:id          ->  update
 * DELETE  /gifts/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Gift = require('./gift.model');

// Get list of gift
exports.index = function(req, res) {
  Gift.find(function (err, gift) {
    if(err) { return handleError(res, err); }
    return res.json(200, gift);
  });
};

// Get a single gift
exports.show = function(req, res) {
  Gift.findById(req.params.id, function (err, gift) {
    if(err) { return handleError(res, err); }
    if(!gift) { return res.send(404); }
    return res.json(gift);
  });
};

// Creates a new gift in the DB.
exports.create = function(req, res) {
  Gift.create(req.body, function(err, gift) {
    if(err) { return handleError(res, err); }
    return res.json(201, gift);
  });
};

// Updates an existing gift in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Gift.findById(req.params.id, function (err, gift) {
    if (err) { return handleError(res, err); }
    if(!gift) { return res.send(404); }
    var updated = _.merge(gift, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, gift);
    });
  });
};

// Deletes a gift from the DB.
exports.destroy = function(req, res) {
  Gift.findById(req.params.id, function (err, gift) {
    if(err) { return handleError(res, err); }
    if(!gift) { return res.send(404); }
    gift.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
