//main app declaration
angular.module('restAPP',['ngResource','angularMoment','restAPP.services','restAPP.controllers']);

angular.module('restAPP').config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
