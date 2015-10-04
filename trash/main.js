var app = angular.module('restAPP',['ngResource','angularMoment']);
var namespace = '/api/v1';

app.controller('UserCtrl',function($scope,$http){
    $scope.name="";
    $scope.password="";
    $scope.token="";
    $scope.loggedInTime="";

    $scope.isAuthenticated = function(){
        return $scope.token.length > 0;
    };

    $scope.login = function(){
        REST_API.authenticate($scope,$http,function(res){
            if( res.success ) {
                $scope.token = res.token;
                $scope.loggedInTime = new Date();
            }
            else { app_alert(res.message); }
        });
    };

    $scope.logout = function(){
        $scope.name="";
        $scope.password="";
        $scope.token="";
    };

    $scope.register = function(){
        REST_API.user.register($scope,$http,function(res){
            if( res.success ) { $scope.login() }
            else { app_alert(res.message); }
        });
    };
});



'use strict';

angular.module('restAPP').controller('LoginController', function ($scope, $location, $http, $window,api) {

    $scope.user = {name: '', password: ''};
    $scope.loggedInTime = '';
    $window.sessionStorage.token = '';

    $scope.isAuthenticated = function(){
        return $window.sessionStorage.token.length > 0;
    };

    $scope.logout = function(){
        $scope.user = {name: '', password: ''};
        $window.sessionStorage.token = '';
    }

    $scope.login = function () {
        $http
            .post('/api/v1/authentication', $scope.user)
            .success(function (data, status, headers, config) {
                $window.sessionStorage.token = data.token;
                $scope.loggedInTime = new Date();
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;
            });
    };

    $scope.register = function () {
        alert('not yet implemented');
    };

});

'use strict';
//main app declaration
var app = angular.module('restAPP',['ui.router','ngResource','angularMoment']);

app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/stateHome");

  $stateProvider
   .state('stateHome', {
     url: "/home",
     templateUrl: "public/partials/home.html"
   })
   .state('stateLogin', {
     url: "/login",
     templateUrl: "public/partials/login.html"
   })
   .state('stateRegister', {
     url: "/register",
     templateUrl: "public/partials/register.html",
     controller: function($scope) {
       $scope.things = ["A", "Set", "Of", "Things"];
     }
   });

});

app.run(function(api){
  api.init();
});

'use strict';

angular.module('restAPP',[]).factory('httpInterceptor', function httpInterceptor ($q, $window, $location) {
  return function (promise) {
      var success = function (response) {
          return response;
      };

      var error = function (response) {
          if (response.status === 401) {
              $location.url('/login');
          }

          return $q.reject(response);
      };

      return promise.then(success, error);
  };
}).factory('api', function ($http, $cookies) {
  return {
      init: function (token) {
          $http.defaults.headers.common['x-access-token'] = token || $window.sessionStorage.token;
      }
  };
});
