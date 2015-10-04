angular.module('authService', [])
  .factory('AuthToken', function($window){
    var authTokenFactory = {};

    //get the token out of local storage
    authTokenFactory.getToken = function(){
      return $window.sessionStorage.token;
    };


    //return auth token factory
    return authTokenFactory;
  }).factory('AuthInterceptor', function($q, $location, AuthToken){
    var interceptorFactory = {};

    //attach the token to all HTTP requests
    interceptorFactory.request = function(config){
      //grab the token
      var token = AuthToken.getToken();

      //If token exists then add it to the header as x-access-token
      if(token)
        config.headers['x-access-token'] = token;

      return config;
    };

    //On response errors

    interceptorFactory.responseError = function(response){
      //If server returns a 403 forbidden response
      //if(response.status == 403)
        //$location.path('/login');

      //return the errors from the server as a promise
      return $q.reject(response);
    }

    //return interceptorFactory
    return interceptorFactory;
  })


angular.module('myApp').factory('Client', function($resource) {
   var resource =  $resource('/api/v1/clients/:id', { id: '@_id' }, {
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: function(data) {
            return angular.fromJson(data).data;
          }
      },
      update: {method: 'POST'}
    });
    return resource;
});
