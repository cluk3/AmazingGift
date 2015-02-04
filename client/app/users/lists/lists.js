'use strict';

angular.module('amazingGiftsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('list', {
        url: '/users/:userId/list/:listId',
        templateUrl: 'app/users/lists/.html',
        controller: 'UsersProfileCtrl',
      })
  });