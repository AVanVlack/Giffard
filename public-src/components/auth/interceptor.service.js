
class AuthInterceptor{
  constructor($q, $cookies, $location){
    this.$q = $q;
    this.$cookies = $cookies;
    this.$location = $location;
  }
  // Add authorization token to headers
  request = (config) => {
    config.headers = config.headers || {};
    if (this.$cookies.get('token')) {
      config.headers.Authorization = 'Bearer ' + this.$cookies.get('token');
    }
    return config;
  }

  // Intercept 401s and redirect you to login
  responseError = (response) => {
    var deferred = this.$q.defer();
    if(response.status === 401) {
      this.$location.path('/login');
      // remove any stale tokens
      this.$cookies.remove('token');
      return deferred.reject(response);
    }
    else {
      return deferred.reject(response);
    }
  }
}

export default AuthInterceptor;
