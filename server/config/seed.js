/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Gift = require('../api/gift/gift.model');
var User = require('../api/user/user.model');


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: {first: 'Test', last: 'user'},
    email: 'test@test.com',
    birthdate: Date.now,
    password: 'test',
  })
  .then(function(user) {
      
    console.log('finished populating users');
      
    Gift.find({}).remove(function() {
        
      Gift.create({
          name : 'Dildo',
          description : 'A wonderful Dildo.',
          surpise: true,
          visibility: 'public',
          owner: user._id
      })
      .then(function() {
        
        console.log('finished populating Gifts');
      
      });

    });

  });
});
