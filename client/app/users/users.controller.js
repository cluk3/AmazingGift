'use strict';

angular.module('amazingGiftsApp')
  .controller('UsersCtrl', function ($scope, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
  });