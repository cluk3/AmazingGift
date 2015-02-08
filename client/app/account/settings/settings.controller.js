'use strict';

angular.module('amazingGiftsApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $location, $log) {
    $scope.errors = {};
    $scope.user = {};
    var user = Auth.getCurrentUser();
    var restid = user.restid;
    $scope.nameFirst = user.name.first;
    $scope.nameLast = user.name.last;
    $scope.email = user.email;

    $scope.changePassword = function(form2) {
      $scope.submitted2 = true;
      if(form2.$valid && form2.$dirty) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.changePasswordMessage = 'Password successfully changed.';
          $scope.submitted2 = false;
          $scope.user = {};
          form2.$setPristine();
        })
        .catch( function() {
          form2.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.changePasswordMessage = '';
        });
      }
    };

    $scope.update = function(form) {
      var userUpd = {};

      $scope.submitted = true;

      if(form.$valid && form.$dirty) {
        $log.log("form valid");

        if(form.first.$dirty || form.last.$dirty) {
          userUpd.name = {
            first: $scope.user.nameFirst,
            last: $scope.user.nameLast
          };
        }
        if(form.email.$dirty)
          userUpd.email = $scope.user.email;

        User.update({ id: restid }, userUpd, function() {
          $log.log("success");
          $scope.updateInfoMessage = 'User successfully updated.';
          $scope.user = {};
          form.$setPristine();
          Auth.refreshCurrentUser()
            .then(function(user) {
              $scope.nameFirst = user.name.first;
              $scope.nameLast = user.name.last;
              $scope.email = user.email;
              restid = user.restid;
            })

        }, function(err) {
          err = err.data;
          $scope.errors = {};
          $scope.updateInfoMessage = err.message;

          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }

    }

    $scope.delete = function() {
      User.remove({ id: restid }, function() {
        Auth.logout();
        $location.path('/');
      });
    };

});
