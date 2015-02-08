'use strict';

angular.module('amazingGiftsApp')
  .controller('UsersProfileCtrl', function ($scope, User, $stateParams) {

    $scope.user = User.get({id: $stateParams.userId})
    .$promise.then( function(user) {
      $scope.fullname = user.name.first + ' ' + user.name.last;
      $scope.email = user.email;
      $scope.id = user._id;
      $scope.bday = user.birthdate;
      $scope.lists = user.lists;

      $scope.hasLists = function(){
        if(user.lists.length) { return true; }
        return false;
      };
    });
  });