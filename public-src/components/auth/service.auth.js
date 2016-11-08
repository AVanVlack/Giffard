class Auth {
  constructor($resource, $cookies){
    this.$resource =  $resource;
    this.$cookies = $cookies;

    let User = $resource('/api/user/me');
    this.currentUser = {};
    if($cookies.get('token')) {
      this.currentUser = User.get('/api/me');
    }
  }

  login(user, callback) {
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
  }

  //  Delete access token and user info

  logout() {
    $cookieStore.remove('token');
    currentUser = {};
  }

  // Gets all available info on authenticated user

  getCurrentUser() {
    return this.currentUser;
  }

  // Check if a user is logged in

  isLoggedIn() {
    return currentUser.hasOwnProperty('username');
  }

  // Waits for currentUser to resolve before checking if user is logged in

  isLoggedInAsync(cb) {
    if(this.currentUser.hasOwnProperty('$promise')) {
      this.currentUser.$promise.then(function() {
        cb(true);
      }).catch(function() {
        cb(false);
      });
    } else if(this.currentUser.hasOwnProperty('username')) {
      cb(true);
    } else {
      cb(false);
    }
  }

  // Get auth token

  getToken() {
    return $cookieStore.get('token');
  }
}

export default Auth;
