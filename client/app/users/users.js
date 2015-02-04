'use strict';

angular.module('amazingGiftsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: 'app/users/users.html',
        controller: 'UsersCtrl'
      })
      .state('profile', {
        url: '/users/:userId',
        templateUrl: 'app/users/users-profile.html',
        controller: 'UsersProfileCtrl',
      });
      /* Non utilizzato, al momento profile si occupa di tutto
      .state('profile.lists', {
        url: '/lists',
        templateUrl: 'app/users/lists/lists.html',
        controller:'ListsController'
      })
      */
  });