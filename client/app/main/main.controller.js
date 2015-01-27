'use strict';

angular.module('amazingGiftsApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeGifts = [];

    $http.get('/api/gifts').success(function(awesomeGifts) {
      $scope.awesomeGifts = awesomeGifts;
      socket.syncUpdates('gift', $scope.awesomeGifts);
    });

    $scope.addGift = function() {
      if($scope.newGift === '') {
        return;
      }
      $http.post('/api/gifts', { name: $scope.newGift });
      $scope.newGift = '';
    };

    $scope.deleteGift = function(gift) {
      $http.delete('/api/gifts/' + gift._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('gift');
    });
  });
