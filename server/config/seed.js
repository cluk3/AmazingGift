/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Gift = require('../api/gift/gift.model');
var User = require('../api/user/user.model');
var RestId = require('../api/restId/restId.model');

RestId.find({}).remove(function() {
  console.log("RestIds removed");
});
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: {first: 'Test', last: 'user'},
    email: 'test@test.com',
    birthdate: Date.now(),
    password: 'test',
  },
  {
    provider: 'local',
    name: {first: 'admin', last: 'cool'},
    email: 'admin@test.com',
    birthdate: Date.now(),
    password: 'admin',
    role: 'admin'
  },
  {
    provider: 'local',
    name: {first: 'test', last: 'user'},
    email: 'toast@test.com',
    birthdate: Date.now(),
    password: 'toast',
    role: 'admin'
  },
  function(err, user) {
      if(err) console.log(err);
    console.log('finished populating Users');

    Gift.find({}).remove(function() {

      Gift.create({
          name : 'Dildo',
          description : 'A wonderful Dildo.',
          surprise: true,
          visibility: 'public',
          owner: user._id
      }, function(err) {
        if(err) return console.log(err);
        console.log('finished populating Gifts');

      });

    });

  });
});
