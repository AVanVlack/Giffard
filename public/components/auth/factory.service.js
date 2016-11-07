export default function authInterceptor($rootScope, $q, $cookies, $location) {
  return {
    // Add authorization token to headers
    request: function (config) {
      config.headers = config.headers || {};
      if ($cookies.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookies.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      var deferred = $q.defer();
      if(response.status === 401) {
        $location.path('/login');
        // remove any stale tokens
        $cookies.remove('token');
        return deferred.reject(response);
      }
      else {
        return deferred.reject(response);
      }
    }
  }
};
