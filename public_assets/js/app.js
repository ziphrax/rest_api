var myApp = angular.module('myApp', ['ui.router','ngResource','angularMoment','authService']);
myApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  $httpProvider.interceptors.push('AuthInterceptor');
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "public/partials/login.html"
    })
    .state('dashboard', {
      url: "/dashboard",
      templateUrl: "public/partials/dashboard.html"
    })
    .state('home', {
      url: "/home",
      templateUrl: "public/partials/home.html"
    })
    .state('clients', {
      url: "/clients",
      templateUrl: "public/partials/clients.html",
      controller: 'ClientController'
    })
    .state('logout', {
      url: "/logout",
      templateUrl: "public/partials/logout.html"
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "public/partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "public/partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});
