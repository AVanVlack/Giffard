'use strict';
angular.module('Gifard')
  .factory('Auth', function Auth($location, $rootScope, $http, $cookieStore, $q, $resource) {
    var User = $resource('/api/me');
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get('/api/me');
    }

    return {

      // Authenticate user and save token

      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      //  Delete access token and user info

      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      // Gets all available info on authenticated user

      getCurrentUser: function() {
        return currentUser;
      },

      // Check if a user is logged in

      isLoggedIn: function() {
        return currentUser.hasOwnProperty('username');
      },

      // Waits for currentUser to resolve before checking if user is logged in

      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('username')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      // Get auth token

      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
