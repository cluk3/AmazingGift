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
    birthdate: new Date(1988, 10, 8),
    password: 'test',
    lists: [{
      name: "Natale",
      restid: '1',
      description: "I love XMas!"
    },
    {
      name: "Birthday",
      restid: '2',
      description: "Gifts for my bday!"
    }]
  },
  {
    provider: 'local',
    name: {first: 'admin', last: 'cool'},
    email: 'admin@test.com',
    birthdate: new Date(1989, 11, 8),
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
  function(err, test,admin, test2) {
    if(err) console.log(err);

    User.findByIdAndUpdate(test._id, {$push: {friends: test2._id}},function(err,user) {
      if(err) throw err;
      console.log(user.friends);
    });

    User.findByIdAndUpdate(test2._id, {$push: {friends: test._id}},function(err,user) {
      if(err) throw err;
       console.log(user.friends);
    });

    console.log('finished populating Users');

    Gift.find({}).remove(function() {

      Gift.create({
          name : 'Tablet',
          description : 'A wonderful tablet.',
          surprise: true,
          visibility: 'public',
          owner: test._id
      }, function(err) {
        if(err) return console.log(err);
        console.log('finished populating Gifts');

      });

    });

  });
});
