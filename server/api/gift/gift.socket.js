/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var gift = require('./gift.model');

exports.register = function(socket) {
  gift.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  gift.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('gift:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('gift:remove', doc);
}
